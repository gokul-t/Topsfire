import React, { FunctionComponent as Component, useEffect, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Image, View, ViewStyle, Dimensions, StyleSheet, Share, Text } from "react-native"
import HTML from "react-native-render-html"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from "@react-navigation/native"
import { Card, Subheading, Paragraph, Surface, FAB, Title } from "react-native-paper"
import { AdMobBanner } from "react-native-admob"
import AppJson from "../../../app"
import { Screen, BaseLayout, CategoryPostList } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"
import config from "../../config"
import * as Utils from "../../utils"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

type PostScreenProps = {
  route: {
    key: string
    name: string
    params: {
      postId: string
      screenCatId?: string
    }
  }
}

const styles = StyleSheet.create({
  fab: {
    zIndex: 100,
    position: "absolute",
    right: 16,
    bottom: -25,
  },
})

export const PostScreen: Component<PostScreenProps> = observer(function PostScreen(props) {
  // Pull in one of our MST stores
  const { postStore, categoryPostStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const { route } = props
  const { postId, screenCatId } = route.params

  // if screenCatId, route coming from category scren else home screen
  const ps = screenCatId ? categoryPostStore.getPostStore(screenCatId) : postStore
  const post = ps.find(postId)

  useEffect(() => {
    // Display ads at 1 by 10 interval
    if (config.ads && 3 === Utils.randomIntFromInterval(1, 10)) {
      Utils.adMobInterstitial()
    }
  }, [])

  const excludePost = useCallback((p) => {
    return p.id !== postId
  }, [postId]);

  if (!postId || !post) {
    goBack()
  }

  if (!post)
    return (
      <BaseLayout
        headerProps={{
          headerText: "Post",
        }}
        screenProps={{ preset: "scroll" }}
      >
        <Text>Go Back</Text>
      </BaseLayout>
    )
  const windowWidth = Dimensions.get("window").width
  return (
    <BaseLayout
      headerProps={{
        headerText: post.formattedTitle,
      }}
      screenProps={{ preset: "scroll" }}
    >
      <View>
        <FAB
          style={styles.fab}
          icon="share"
          onPress={() => onShare(post.formattedTitle, post.link)}
        />
        <Image
          source={{
            uri: post.imageUrl,
          }}
          // resizeMode="contain"
          style={{
            height: 200,
            width: windowWidth,
          }}
        />
      </View>
      <Card>
        <Card.Content>
          <Subheading>{post.formattedTitle}</Subheading>
          <Paragraph>
            <MaterialCommunityIcons name="clock" />
            {` ${post.formattedDate}`}
          </Paragraph>
        </Card.Content>
      </Card>
      {config.ads && (
        <AdMobBanner
          adSize="mediumRectangle"
          adUnitID={config.adUnitID.banner}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      )}
      <View>
        <HTML
          html={post.content.rendered}
          imagesMaxWidth={windowWidth}
          staticContentMaxWidth={windowWidth}
          alterChildren={node => {
            if (node.name === "iframe" || node.name === "img") {
              delete node.attribs.width
              delete node.attribs.height
            }
            return node.children
          }}
          onLinkPress={(evt, href) => href}
          listsPrefixesRenderers={{
            ul: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
              return <View style={{ padding: 0, margin: 0 }} />
            },
            li: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
              return <View style={{ padding: 0, margin: 0 }} />
            },
          }}
        />
      </View>
      {config.ads && (
        <AdMobBanner
          adSize="fullBanner"
          adUnitID={config.adUnitID.banner}
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
      )}
      <Title> Related Posts </Title>
      {post.categories.map(categoryId => <CategoryPostList categoryId={categoryId} horizontal={true} filter={excludePost} ></CategoryPostList>)}
    </BaseLayout>
  )
})

const onShare = async (message?: string, url?: string) => {
  try {
    const result = await Share.share({
      message: message + "\n" + url,
      url,
      title: "Shared via " + AppJson.name,
    })
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      __DEV__ && console.tron.log(result)
    }
  } catch (error) {
    Alert.alert(error.message)
  }
}
