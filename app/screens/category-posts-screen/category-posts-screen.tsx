import React, { FunctionComponent as Component } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text, BaseLayout, CategoryPostList } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}

type CategoryPostsScreenProps = {
  route: {
    key: string
    name: string
    params: {
      categoryId: string
    }
  }
}
export const CategoryPostsScreen: Component<CategoryPostsScreenProps> = observer(
  function CategoryPostsScreen(props) {
    // Pull in one of our MST stores
    const { categoryStore } = useStores()
    // OR
    // const rootStore = useStores()

    // Pull in navigation via hook
    const navigation = useNavigation()
    const { route } = props
    const { categoryId } = route.params
    const category = categoryStore.find(categoryId)
    const goBack = () => navigation.goBack()
    if (!category) {
      goBack()
    }
    return (
      <BaseLayout
        headerProps={{
          headerText: category ? category.name : "",
        }}
      >
        {categoryId && <CategoryPostList
          {...{
            categoryId,
          }}
        />}
      </BaseLayout>
    )
  },
)
