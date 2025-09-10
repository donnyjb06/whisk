import { SERPAPI_API_KEY } from "@/lib/constants";
import { getJson } from "serpapi";

const buildQuery = (recipeTitle: string) => {
  const exclusions = [
    "shutterstock",
    "getty",
    "istock",
    "alamy",
    "dreamstime",
    "depositphotos",
    "123rf"
  ]
  return `${recipeTitle} food recipe dish -${exclusions.join(" -")}`;
}

const getRecipeImage = async (recipeTitle: string) => {
  const res = await getJson({
    api_key: SERPAPI_API_KEY,
    engine: "google_images",
    google_domain: "google.com",
    q: buildQuery(recipeTitle),
    gl: "us",
    hl: "en",
    imgar: "w",
    imgsz: "l",
    image_type: "photo",
    licenses: "f",
    safe: "active"
  })


}