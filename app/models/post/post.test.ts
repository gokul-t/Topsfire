import { PostModel, Post } from "./post"

test("can be created", () => {
  const instance: Post = PostModel.create({})

  expect(instance).toBeTruthy()
})
