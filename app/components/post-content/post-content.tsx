import * as React from "react"
import { Dimensions, View } from "react-native"
import HTML from "react-native-render-html"

// import { Text } from "../"
// import { postContentStyles as styles } from "./post-content.styles"

export interface PostContentProps {
  /**
   * Text which is looked up via i18n.
   */
  post: any
}

/**
 * Stateless functional component for your needs
 *
 * Component description here for TypeScript tips.
 */
export const PostContent = React.memo((props: PostContentProps) => {
  // grab the props
  const { post } = props
  const windowWidth = Dimensions.get("window").width;

  return (
    <HTML
      key={"contentView"}
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
  )
});
