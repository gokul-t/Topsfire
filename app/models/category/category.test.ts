import { CategoryModel, Category } from "./category"

test("can be created", () => {
  const instance: Category = CategoryModel.create({})

  expect(instance).toBeTruthy()
})
