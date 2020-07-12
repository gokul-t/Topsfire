import React, { FunctionComponent as Component } from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"
// import { Text } from "../"
import { observer, useObserver } from "mobx-react-lite"
// import { useStores } from "../../models"
import { postCardStyles as styles } from "./post-card.styles"

export interface PostCardProps { }

const getImageUrl = i => {
  if (i.featured_media.length) {
    const media = i.featured_media.find(m => m.source_url);
    return media.medium || media.thumbnail || media.source_url;
  }
  return null;
}
/**
 * This is a React functional component, ready to 
 *
 * Component description here for TypeScript tips.
 */
export const PostCard: Component<PostCardProps> = React.memo(props => {
  // Note: if you want your componeobservernt to refresh when data is updated in the store,
  // wrap this component in `` like so:
  // `export const PostCard = observer(function PostCard { ... })`

  // Enable this line to retrieve data from the rootStore (or other store)
  // const rootStore = useStores()
  // or
  // const { otherStore, userStore } = useStores()
  const { item, onPress } = props;
  const imageUrl = getImageUrl(item);

  return useObserver(() => (
    <TouchableOpacity style={styles.listItemAreas} onPress={() => null}>
      <View>
        <Image
          source={imageUrl ? {
            uri: imageUrl
          } : null}
          style={{
            height: 75,
            width: 75,
            borderRadius: 10
          }}
        />
      </View>
      <View style={styles.listTextArea}>
        <Text style={styles.listTitle} numberOfLines={2}>{item.title.rendered}</Text>
      </View>
    </TouchableOpacity>
  ))
})
