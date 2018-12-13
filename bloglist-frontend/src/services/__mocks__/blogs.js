let token = null

const blogs = [
  {
    id: "5bf0586025439003699e2cfc",
    title: "fresh new start",
    author: "pikku J",
    url: "www.tuoreena.com",
    likes: 38,
    user: {
      _id: "5bdc5a84b6e89f27cc0c9a50",
      username: "wild1",
      name: "Wille Dikkilä"
    }
  },
  {
    id: "5bf5d59c6f8344053dcee390",
    title: "From Palm to Elm - Visions from the 2010s ",
    author: "Larry Linkkula",
    url: "https://www.tori.fi/",
    likes: 10,
    user: {
      _id: "5bdc5a84b6e89f27cc0c9a50",
      username: "wild1",
      name: "Wille Dikkilä"
    }
  },
  {
    id: "5bfc0fef9e5a4002b58f6be9",
    title: "another one",
    author: "jr",
    url: "aha",
    likes: 11,
    user: {
      _id: "5bfc0e2b9e5a4002b58f6be2",
      username: "juhidi",
      name: "juhiel junior"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }