import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { RelatedPosts } from "./related-posts"

declare var module

storiesOf("RelatedPosts", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <RelatedPosts text="RelatedPosts" />
      </UseCase>
    </Story>
  ))
