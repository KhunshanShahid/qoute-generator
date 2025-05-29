import React, { useEffect, useState } from "react"
import UserStyles from "../styles/UserQoute.module.css"
import Loader from "./Loader"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const UserQoute = () => {
  const username = useSelector((state) => state.username)

  const [userQoute, setuserQoute] = useState([
    {
      text: "Sometimes when you're in a dark place you think you've been buried, but you've actually been planted.",
      author: "Christine Cane",
    },
  ])
  const [saveQoute, setsaveQoute] = useState([
    {
      text: "",
      author: "",
    },
  ])
  const [filterQoute, setFilterQoute] = useState([])
  const [loader, setLoader] = useState(true)
  const [qoute, setMyQoute] = useState([
    {
      text: "",
      author: "",
    },
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchBox, setSearchBox] = useState("")

  useEffect(() => {
    setLoader(false)
    const storedUserQoute = JSON.parse(
      localStorage.getItem(`userQoutes-${username}`)
    )
    if (storedUserQoute) {
      setuserQoute(storedUserQoute)
      setFilterQoute(storedUserQoute)
    } else {
      setuserQoute([
        {
          text: "Sometimes when you're in a dark place you think you've been buried, but you've actually been planted.",
          author: "Christine Cane",
        },
      ])
      setFilterQoute([
        {
          text: "Sometimes when you're in a dark place you think you've been buried, but you've actually been planted.",
          author: "Christine Cane",
        },
      ])
    }
  }, [username])
  const changeQoute = (e) => {
    setMyQoute({ ...qoute, [e.target.name]: e.target.value })
  }

  const addData = (e) => {
    e.preventDefault()
    if (qoute.text && qoute.text.length>4){
      setShowAddForm(false)
      setsaveQoute([...saveQoute, qoute])
      setMyQoute({
        text: "",
        author: "",
      })
      const updatedUserQoute = [...userQoute, qoute]
      localStorage.setItem(
        `userQoutes-${username}`,
        JSON.stringify(updatedUserQoute)
      )
      setuserQoute(updatedUserQoute)
      if (searchBox === "") {
        setFilterQoute(updatedUserQoute)
      } else {
        const filteredData = updatedUserQoute.filter((item) => {
          return item.text.toLowerCase().includes(searchBox.toLowerCase())
        })
        setFilterQoute(filteredData)
      }
    }
    else{
      toast.warning("Qoute should contain a word atleast")
    }

  }
  const QouteHandler = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quote?"
    )
    if (confirmDelete) {
      const newQoutes = [...userQoute]
      newQoutes.splice(index, 1)
      setuserQoute(newQoutes)
      setFilterQoute(newQoutes)
      localStorage.setItem(`userQoutes-${username}`, JSON.stringify(newQoutes))
    }
  }
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }
  const searchValue = (e) => {
    const searchValue = e.target.value
    setSearchBox(searchValue)

    if (searchValue === "") {
      setFilterQoute(userQoute)
    } else {
      const filteredData = userQoute.filter((item) => {
        return item.text.toLowerCase().includes(searchValue.toLowerCase())
      })

      setFilterQoute(filteredData)
    }
  }

  return (
    <>
     <div className={UserStyles.cardBox}>
  {loader ? (
    <Loader />
  ) : (
    <>
      {showAddForm ? (
        <form className={UserStyles.addQouteForm}>
          <input
            type="text"
            name="text"
            value={qoute.text}
            placeholder="Write Your Quote"
            onChange={changeQoute}
            className={UserStyles.searchBar}
          />
          <input
            type="text"
            name="author"
            value={qoute.author}
            placeholder="Author Name"
            onChange={changeQoute}
            className={UserStyles.searchBar}
            required
          />
          <button onClick={addData} className={UserStyles.addBtn}>
            Add Value
          </button>
        </form>
      ) : (
        <>
          <div>
            <div>
              <input
                type="text"
                value={searchBox}
                placeholder="Search Your Quote"
                className={UserStyles.searchBar}
                onChange={searchValue}
              />
              <button
                className={UserStyles.NewBtn}
                onClick={toggleAddForm}
              >
                New Quote
              </button>
            </div>
          </div>
          <div className={UserStyles.cardContainer}>
            {filterQoute.map((item, index) => {
              return (
                <div key={index} className={UserStyles.card}>
                  <div className={UserStyles.qouteBox}>
                    <div className={UserStyles.mainQoute}>
                      {item.text}
                    </div>
                    <div className={UserStyles.Author}>
                      {item.author
                        ? item.author.charAt(0).toUpperCase() +
                          item.author.slice(1)
                        : username.charAt(0).toUpperCase() +
                          username.slice(1)}
                    </div>
                    <button
                      className={UserStyles.NewBtn}
                      onClick={() => QouteHandler(index)}
                    >
                      Delete Quote
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </>
  )}
</div>

    </>
  )
}

export default UserQoute
