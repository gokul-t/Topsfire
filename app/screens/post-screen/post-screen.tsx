import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { Image, View, ViewStyle, Dimensions } from "react-native"
import HTML from 'react-native-render-html';
import { useNavigation } from "@react-navigation/native"
import moment from "moment"
import { Screen, Text, BaseLayout } from "../../components"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

type PostScreenProps = {
  route: {
    key: string
    name: string,
    params: {
      postId: string,
      screenCatId?: string
    }
  }
}

export const PostScreen: Component<PostScreenProps> = observer(function PostScreen(props) {
  // Pull in one of our MST stores
  const { postStore, categoryPostStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack();
  const { route } = props;
  const { postId, screenCatId } = route.params;
  if (!postId) {
    goBack();
  }
  // if screenCatId, route coming from category scren else home screen
  const ps = screenCatId ? categoryPostStore.getPostStore(screenCatId) : postStore;
  const post = ps.find(postId);

  if (!post)
    return <BaseLayout headerProps={{
      headerText: "Post"
    }} screenProps={{ preset: "scroll" }} >
      <Text >Go Back</Text>
    </BaseLayout>
  const windowWidth = Dimensions.get('window').width;
  return (
    <BaseLayout headerProps={{
      headerText: post ? post.title.rendered : null
    }} screenProps={{ preset: "scroll" }}>
      {post.date ? <Text >Published on: {moment(post.date).format('d MMM Y')}</Text> : null}
      <Image
        source={post.imageUrl ? {
          uri: post.imageUrl
        } : null}
        style={{
          height: 250,
          width: windowWidth * .9,
          borderRadius: 10
        }}
      />
      {/* <Text text={post.content.rendered}></Text> */}
      <HTML
        html={post.content.rendered}
        imagesMaxWidth={windowWidth}
        staticContentMaxWidth={windowWidth}
        alterChildren={node => {
          if (node.name === "iframe" || node.name === "img") {
            delete node.attribs.width;
            delete node.attribs.height;
          }
          return node.children;
        }}
        onLinkPress={(evt, href) => (href)}
        listsPrefixesRenderers={{
          ul: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
            return <View style={{ padding: 0, margin: 0 }} />
          },
          li: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
            return <View style={{ padding: 0, margin: 0 }} />
          },
        }}
      />
    </BaseLayout >
  )
})
