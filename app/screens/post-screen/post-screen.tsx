import React, { FunctionComponent as Component, useEffect, useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { PostCardAdsType, BaseLayout, RelatedPosts, PostBanner, PostContent } from "../../components"
import { useStores } from "../../models"
import config from "../../config"
import * as Utils from "../../utils"

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

export const PostScreen: Component<PostScreenProps> = observer(function PostScreen(props) {
  // Pull in one of our MST stores
  const { postStore, categoryPostStore } = useStores()
  const [showRelatedPosts, setShowRelatedPosts] = useState(false);
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  const { route } = props;
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowRelatedPosts(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);


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

  const data = [<PostBanner key={"postBanner"} post={post}></PostBanner>];
  if (config.ads) {
    data.push(<PostCardAdsType key={"adCardView1"} ></PostCardAdsType>)
  }
  data.push(<PostContent key={"postContent"} post={post}></PostContent>)
  if (config.ads) {
    data.push(<PostCardAdsType key={"adCardView2"} cardType={2}></PostCardAdsType>)
  }
  if (showRelatedPosts) {
    data.push(<RelatedPosts key={"relatedPosts"} post={post}></RelatedPosts>)
  } else {
    data.push(<ActivityIndicator key={"activityIndicator"} animating={true} />)
  }

  const renderItem = useCallback(
    renderItemProps => (
      renderItemProps.item
    ),
    [],
  );

  return (
    <BaseLayout
      headerProps={{
        headerText: post.formattedTitle,
      }}
    // screenProps={{ preset: "scroll" }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </BaseLayout>
  )
})

