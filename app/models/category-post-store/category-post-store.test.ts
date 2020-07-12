import { CategoryPostStoreModel, CategoryPostStore } from "./category-post-store"

test("can be created", () => {
  const instance: CategoryPostStore = CategoryPostStoreModel.create({})

  expect(instance).toBeTruthy()
})