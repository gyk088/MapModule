import "Images"
import Config from "./conf"
import Cookies from "js-cookie"

document.addEventListener("DOMContentLoaded", () => {
  console.log(VERSION)

  if (
    document.location.search &&
    document.location.search.indexOf("?token=") !== -1
  ) {
    Cookies.set("token", document.location.search.replace("?token=", ""))
    document.location.href = document.location.pathname
  }

  new Config.modules["map"].class()
})
