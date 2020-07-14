import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { CategoryPostList } from "./category-post-list"

declare var module

storiesOf("CategoryPostList", module)
  .addDecorator(fn => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CategoryPostList text="CategoryPostList" />
      </UseCase>
    </Story>
  ))
