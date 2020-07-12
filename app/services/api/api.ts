import { ApisauceInstance, create, ApiResponse } from "apisauce"
import WPAPI, { WPRequest } from "wpapi";
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import * as Models from "../../models"
import * as Utils from "../../utils"
/**
 * Manages all requests to the API.
 */
let postsResponse: WPRequest = null;

export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance
  /**
   * The underlying WPAPI instrance which perform the requests
   */
  wp: WPAPI
  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
    this.wp = new WPAPI({ endpoint: this.config.url });
  }

  /**
 * Gets a list of users.
 */
  async getCategories(page = 1): Promise<Types.GetCategoryResult> {
    // make the api call
    // transform the data into the format we are expecting
    const convertCategory = raw => {
      return {
        id: String(raw.id),
        name: raw.name,
        count: raw.count,
        description: raw.description,
        link: raw.link,
        slug: raw.slug,
        taxonomy: raw.taxonomy,
        parent: raw.parent
      }
    }
    try {
      // wp-json/wp/v2/categories?hide_empty=true&per_page=15
      const response: WPRequest = await this.wp.categories().param("hide_empty", "true").page(page).perPage(15);
      const rawCategories = response;
      const resultCategories: Models.CategorySnapshot[] = rawCategories.map(convertCategory)
      return {
        kind: "ok",
        categories: resultCategories,
        total: response._paging.total,
        totalPages: response._paging.totalPages
      }
    } catch {
      return { kind: "bad-data" }
    }
  }

  convertPost = raw => {
    const featured_media = raw._embedded["wp:featuredmedia"] || [];

    const convertFeaturedMedia = (m) => {
      return ({
        medium: m.media_details.sizes.medium.source_url,
        large: m.media_details.sizes.large.source_url,
        thumbnail: m.media_details.sizes.thumbnail.source_url,
        source_url: m.source_url
      })
    }

    return {
      id: String(raw.id),
      date: raw.date,
      title: raw.title,
      content: raw.content,
      status: raw.status,
      featured_media: featured_media.map(convertFeaturedMedia),
      categories: raw.categories
    }
  }
  async getPosts({ categoryId }): Promise<Types.GetPostsResult> {
    try {
      const request = categoryId ? this.wp.posts().category(categoryId) : this.wp.posts();
      postsResponse = await request.embed()
      const rawPosts = postsResponse;
      const resultPosts: Models.PostSnapshot[] = rawPosts.map(this.convertPost)
      return { kind: "ok", posts: resultPosts }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async loadMorePosts(): Promise<Types.GetPostsResult> {
    if (postsResponse && postsResponse._paging && postsResponse._paging.next) {
      try {
        postsResponse = await postsResponse._paging.next;
        const rawPosts = postsResponse;
        const resultPosts: Models.PostSnapshot[] = rawPosts.map(this.convertPost)
        return { kind: "ok", posts: resultPosts }
      } catch (err) {
        // alert(err.message)
        return { kind: "bad-data" }
      }
    }
    return { kind: "rejected" }
  }


  /**
   * Gets a list of users.
   */
  async getUsers(): Promise<Types.GetUsersResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    const convertUser = raw => {
      return {
        id: raw.id,
        name: raw.name,
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawUsers = response.data
      const resultUsers: Types.User[] = rawUsers.map(convertUser)
      return { kind: "ok", users: resultUsers }
    } catch {
      return { kind: "bad-data" }
    }
  }

  /**
   * Gets a single user by ID
   */

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
