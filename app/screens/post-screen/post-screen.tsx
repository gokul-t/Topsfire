import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, BaseLayout } from "../../components"
import { useNavigation } from "@react-navigation/native"
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

  return (
    <BaseLayout headerProps={{
      headerText: post ? post.title.rendered : null
    }} screenProps={{ preset: "scroll" }}>
      <Text text={post.content.rendered}></Text>
    </BaseLayout >
  )
})
