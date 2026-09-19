import { useState } from "react"
import "./App.css"

function App() {
  const [page, setPage] = useState("home")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [selectedFood, setSelectedFood] = useState(null)
  const [surpriseStep, setSurpriseStep] = useState(1)

  // =========================
  // PASSWORD HASH
  // =========================
  const PASSWORD_HASH =
    "f28a65ad88c5e91ba1fd10df3404a4f33197040c2188074ab9efaa1cb4fc6dbb"

  const hashPassword = async (value) => {
    const data = new TextEncoder().encode(value)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))

    return hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  }

  // =========================
  // WISH BOX
  // =========================
  const [wishPassword, setWishPassword] = useState("")
  const [wishUnlocked, setWishUnlocked] = useState(false)
  const [wishInput, setWishInput] = useState("")

  const [wishes, setWishes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tataWishes")) || []
    } catch {
      return []
    }
  })

  // =========================
  // QUIZ
  // =========================
  const [quizPassword, setQuizPassword] = useState("")
  const [quizUnlocked, setQuizUnlocked] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [quizDone, setQuizDone] = useState(false)

  const quizQuestions = [
    {
      question: "event apa yang bikin kamu kenal aku?",
      options: ["ramu rakit", "language olympiade", "MSS", "PPKA"],
      answer: "ramu rakit",
    },
    {
      question: "di mana kita ketemu ?",
      options: ["ulbab", "kamar 17 izza 5", "bakes", "saung"],
      answer: "kamar 17 izza 5",
    },
    {
      question: "pertama kali kenal kita ngomongin soal?",
      options: ["cita-cita", "pembangunan darqo 5", "acapella", "ustadzah"],
      answer: "acapella",
    },
    {
      question: "waktu tata ke tangerang,kita main ke mall?",
      options: ["sency", "pakuwon", "BSD", "tangcity"],
      answer: "tangcity",
    },
    {
      question: "bagaimana penulisan nama tata yg benar?",
      options: ["talitha", "talita", "thalita", "thalitha"],
      answer: "talita",
    },
    {
      question: "dimana tempat tinggal tata?",
      options: ["bogor", "palembang", "planet bekasi", "labuan bajo"],
      answer: "planet bekasi",
    },
    {
      question: "tata keturunan?",
      options: [
        "bugisXpadang",
        "condetXgarut",
        "pamulangXpalangkaraya",
        "semua benar",
      ],
      answer: "bugisXpadang",
    },
    {
      question: "siapa karakter toy story yang identik sama tata?",
      options: ["mauli", "lotso", "woody", "vilmei"],
      answer: "lotso",
    },
    {
      question: "apa hal baru yg sapira coba pas kenal tata?",
      options: ["main lego", "manjat pohon", "nanem sawit", "jadi kiper"],
      answer: "main lego",
    },
    {
      question: "siapa yang bole buka tataverse?",
      options: ["talita zahra", "tata", "kakanya fatim & dewo", "semua benar"],
      answer: "semua benar",
    },
  ]

  // =========================
  // PASSWORD UTAMA
  // =========================
  const checkPassword = async () => {
    const hashedPassword = await hashPassword(password)

    if (hashedPassword === PASSWORD_HASH) {
      setPage("intro")
      setError("")
    } else {
      setError("hayooo taa, masa tanggal lahir kamu sendiri lupaa😭")
    }
  }

  // =========================
  // WISH PASSWORD
  // =========================
  const checkWishPassword = async () => {
    const hashedPassword = await hashPassword(wishPassword)

    if (hashedPassword === PASSWORD_HASH) {
      setWishUnlocked(true)
    } else {
      alert("sandi salah ta 😭")
    }
  }

  // =========================
  // SAVE WISH
  // =========================
  const saveWish = () => {
    if (wishInput.trim() === "") return

    const newWishes = [...wishes, wishInput.trim()]

    setWishes(newWishes)
    localStorage.setItem("tataWishes", JSON.stringify(newWishes))
    setWishInput("")
  }

  // =========================
  // QUIZ PASSWORD
  // =========================
  const checkQuizPassword = async () => {
    const hashedPassword = await hashPassword(quizPassword)

    if (hashedPassword === PASSWORD_HASH) {
      setQuizUnlocked(true)
    } else {
      alert("sandi salah ta 😭")
    }
  }

  // =========================
  // ANSWER QUIZ
  // =========================
  const answerQuiz = (option) => {
    const isCorrect = option === quizQuestions[quizIndex].answer
    const newScore = isCorrect ? quizScore + 1 : quizScore

    setQuizScore(newScore)

    if (quizIndex + 1 < quizQuestions.length) {
      setQuizIndex(quizIndex + 1)
    } else {
      setQuizDone(true)
    }
  }

  // =========================
  // RESET QUIZ
  // =========================
  const resetQuiz = () => {
    setQuizIndex(0)
    setQuizScore(0)
    setQuizDone(false)
  }

  return (
    <div className="container">
      {/* =========================
          DECORATION
      ========================= */}
      <div className="space-decor">
        <div className="shooting-star"></div>
        <div className="astronaut">👨‍🚀</div>
        <div className="rocket">🚀</div>
        <div className="planet">🪐</div>
      </div>

      <div className="stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* =========================
          HOME
      ========================= */}
      {page === "home" && (
        <div className="page home-page">
          <h1>🌌 welcome to tataverse 🌌</h1>

          <p className="typing-text">
            hi ta, i made this little universe just for you 🪐✨
          </p>

          <div className="button-group">
            <button onClick={() => setPage("password")}>
              let's gooo🚀🚀
            </button>

            <button
              className="no-btn"
              onMouseEnter={(e) => {
                e.target.style.transform = `translate(${
                  Math.random() * 120 - 60
                }px, ${Math.random() * 80 - 40}px)`
              }}
            >
              ga dulu😔
            </button>
          </div>
        </div>
      )}

      {/* =========================
          PASSWORD
      ========================= */}
      {page === "password" && (
        <div className="page password-page">
          <h2>enter the secret code 🔐</h2>

          <p>masukin password dulu la taaa 💜</p>

          <input
            type="password"
            placeholder="masukin disiniii..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkPassword()
              }
            }}
          />

          {error && <p className="error-text">{error}</p>}

          <button onClick={checkPassword}>yok lanjutt</button>

          <button className="small-btn" onClick={() => setPage("home")}>
            balik lagi!
          </button>
        </div>
      )}

      {/* =========================
          INTRO
      ========================= */}
      {page === "intro" && (
        <div className="page intro-page">
          <h2>hallo tataaa👋🏻👋🏻</h2>

          <p>
            Selamat datang di tataverse, ucapannya ada di bagian (letter💌) ya
          </p>

          <p>di next aja taa 🫵🏻</p>

          <button onClick={() => setPage("gifts")}>nexttt🚀</button>
        </div>
      )}

      {/* =========================
          GIFTS
      ========================= */}
      {page === "gifts" && (
        <div className="page gifts-page">
          <h1>these are for you 🎁</h1>

          <p>liat satu persatu ta, jan ad yang kelewattt</p>
          <p>urutannya:song,food,letter,wish,surprise box,quiz</p>

          <div className="gift-grid">
            <div className="gift-card" onClick={() => setPage("letter")}>
              <span>💌</span>
              <p>letter</p>
            </div>

            <div className="gift-card" onClick={() => setPage("song")}>
              <span>🎧</span>
              <p>song</p>
            </div>

            <div className="gift-card" onClick={() => setPage("surprise")}>
              <span>🎁</span>
              <p>surprise box</p>
            </div>

            <div className="gift-card" onClick={() => setPage("food")}>
              <span>🍜</span>
              <p>food</p>
            </div>

            <div className="gift-card" onClick={() => setPage("wish")}>
              <span>🌙</span>
              <p>wish</p>
            </div>

            <div className="gift-card" onClick={() => setPage("quiz")}>
              <span>❓</span>
              <p>quiz</p>
            </div>
          </div>

          <button onClick={() => setPage("home")}>return</button>
        </div>
      )}

      {/* =========================
          LETTER
      ========================= */}
      {page === "letter" && (
        <div className="page content-page letter-card">
          <h2>letter for tata 💌</h2>

          <p>
            selamat ulang tahun tata! Semoga panjang umur, sehat selalu,
            dimudahin dan dilancarin terus urusan belajar dan kuliahnya.
            Semoga tata selalu jadi orang baik, punya hati yang lapang, dan
            selalu jadi tata yang penyabar serta dewasa. semoga semua
            harapan tata bisa terwujud satu per satu.
            <br />
            <br />
            tetep jadi diri kamu sendiri ta. Di lingkungan hidup manapun tata
            berada, aku cuma berharap tata bisa lebih sering merasa cukup.
            cukup bahagia dan cukup dihargai, tanpa harus selalu membuktikan
            apa pun ke siapapun.

          </p>

          <button onClick={() => setPage("gifts")}>return</button>
        </div>
      )}

      {/* =========================
          SONG
      ========================= */}
      {page === "song" && (
        <div className="page content-page">
          <h2>song belong to rex orange🎧</h2>

          <p>but this song always reminds me of tataaa🎶🤟🏻</p>

          <div className="song-list">
            <iframe
              src="https://www.youtube.com/embed/G5kH8JQs7LY"
              title="Song 1"
              frameBorder="0"
              allowFullScreen
            ></iframe>

            <iframe
              src="https://www.youtube.com/embed/nr2CsEtXxmI"
              title="Song 2"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <button onClick={() => setPage("gifts")}>return</button>
        </div>
      )}

      {/* =========================
          SURPRISE
      ========================= */}
      {page === "surprise" && (
        <div className="page content-page">
          <h2>surprise for tata 🎁</h2>

          <div className="surprise-box">
            {surpriseStep === 1 ? (
              <>
                <img
                  key="cake"
                  src="/cake.jpeg"
                  alt="this is cake online for tata"
                  className="surprise-image"
                />

                <p>cake online for u</p>
                <p>cake sama ucapan di buat terpisah ya wkwk</p>
                <button onClick={() => setSurpriseStep(2)}>
                  Next
                </button>
              </>
            ) : (
              <>
                <img
                  key="tata"
                  src="/tata.jpeg"
                  alt="Tata"
                  className="surprise-image"
                />

                <p>hope you like it taa😁😇</p>
              </>
            )}
          </div>

          <button
            onClick={() => {
              setSurpriseStep(1)
              setPage("gifts")
            }}
          >
            return
          </button>
        </div>
      )}

      {/* =========================
          FOOD
      ========================= */}
      {page === "food" && (
        <div className="page content-page">
          <h2>this food reminds me of tataaa🍜</h2>

          {!selectedFood ? (
            <>
              <p>jan lupa dibuka satu satu juga taa😁</p>

              <div className="food-grid">
                <div
                  className="food-card"
                  onClick={() => setSelectedFood("bolaubi")}
                >
                  <img src="/bolaubi.jpeg" alt="bola ubi" />
                  <p>bola ubi</p>
                </div>

                <div
                  className="food-card"
                  onClick={() => setSelectedFood("icecream")}
                >
                  <img src="/icecream.jpeg" alt="ice cream kantin" />
                  <p>ice cream kantin</p>
                </div>

                <div
                  className="food-card"
                  onClick={() => setSelectedFood("greentea")}
                >
                  <img src="/greentea.jpeg" alt="NuGreentea" />
                  <p>NuGreentea</p>
                </div>

                <div
                  className="food-card"
                  onClick={() => setSelectedFood("nutriboost")}
                >
                  <img src="/nutriboost.jpeg" alt="NutriBoost" />
                  <p>nutriboost</p>
                </div>
              </div>
            </>
          ) : (
            <div className="food-result">
              {selectedFood === "bolaubi" && (
                <>
                  <img src="/bolaubi.jpeg" alt="bola ubi" />

                  <p>
                    sebenernya garagara bola ubi bikin kita bisa main waktu
                    itu😭💜
                  </p>
                </>
              )}

              {selectedFood === "icecream" && (
                <>
                  <img src="/icecream.jpeg" alt="ice cream kantin" />

                  <p>ice cream kantin pas belajar malem juga enak,ya ga ta?🍦😄</p>
                </>
              )}

              {selectedFood === "greentea" && (
                <>
                  <img src="/greentea.jpeg" alt="NuGreentea" />

                  <p>
                    inget banget tata pernah ngasih aku nugreentea waktu
                    latihan panah🏹
                  </p>
                </>
              )}

              {selectedFood === "nutriboost" && (
                <>
                  <img src="/nutriboost.jpeg" alt="NutriBoost" />

                  <p>
                    inget tata waktu itu suka beli ini rasa jeruk, padahal asem jirss🤙🏻
                  </p>
                </>
              )}

              <button onClick={() => setSelectedFood(null)}>
                choose again
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setSelectedFood(null)
              setPage("gifts")
            }}
          >
            return
          </button>
        </div>
      )}

      {/* =========================
          WISH BOX
      ========================= */}
      {page === "wish" && (
        <div className="page content-page wish-page">
          <h2>✨ wish box ✨</h2>

          {!wishUnlocked ? (
            <>
              <p>
                taaa, di sini tata bisa tulis wish wish kamu buat jangka
                panjang ke depan. bahasa sekarangnya sih “manifesting” wkwk.
                mau manifesting kecil-kecilan, sampe manifesting yang
                besar-besaran juga bebas. pokonya tulis aja apa yang tata
                pengen, siapa tau dan semoga satu-satu nanti bisa jadi
                kenyataan 🤍✨
              </p>

              <input
                className="wish-input"
                type="password"
                placeholder="masukin sandinya ta..."
                value={wishPassword}
                onChange={(e) => setWishPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    checkWishPassword()
                  }
                }}
              />

              <div className="wish-buttons">
                <button onClick={checkWishPassword}>unlock</button>

                <button onClick={() => setPage("gifts")}>return</button>
              </div>
            </>
          ) : (
            <>
              <p>
                nahh, di sini tulis manifesting nya taa. jangan lupa disimpen,
                biar jadi arsip yang bisa tata buka kapan aja tata mau ✨
              </p>

              <textarea
                className="wish-textarea"
                placeholder="tulis harapan kamu di sini..."
                value={wishInput}
                onChange={(e) => setWishInput(e.target.value)}
              ></textarea>

              <div className="wish-buttons">
                <button onClick={saveWish}>save wish</button>

                <button onClick={() => setPage("gifts")}>return</button>
              </div>

              <div className="wish-list">
                {wishes.map((wish, index) => (
                  <div className="wish-item" key={index}>
                    ✨ {wish}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* =========================
          QUIZ
      ========================= */}
      {page === "quiz" && (
        <div className="page content-page quiz-page">
          <h2>❓ tata quiz ❓</h2>

          {!quizUnlocked ? (
            <>
              <p>masukin sandi dulu ta, baru boleh main quiz 😁</p>

              <input
                className="quiz-input"
                type="password"
                placeholder="masukin sandinya..."
                value={quizPassword}
                onChange={(e) => setQuizPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    checkQuizPassword()
                  }
                }}
              />

              <div className="quiz-buttons">
                <button onClick={checkQuizPassword}>unlock</button>

                <button onClick={() => setPage("gifts")}>return</button>
              </div>
            </>
          ) : (
            <>
              {!quizDone ? (
                <>
                  <p className="quiz-number">
                    question {quizIndex + 1} / {quizQuestions.length}
                  </p>

                  <h3>{quizQuestions[quizIndex].question}</h3>

                  <div className="quiz-options">
                    {quizQuestions[quizIndex].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => answerQuiz(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h2>quiz selesai 🎉</h2>

                  <p>
                    score kamu: {quizScore} / {quizQuestions.length}
                  </p>

                  <p>
                    apapun scorenya, makasiii sudah mengikuti tahap tahap tataverse ini 🪐✨
                  </p>
                  
                  <p>
                    ini semua aku bikin sendiri jadi maap yak kalo masi kaga 
                    sempurna sempurna banget,aku pake sistem SKS soalnya (sistem kebut seharian)😂
                  </p>
                  <p>
                    hope you like it taa😄😄
                  </p>

                  <button onClick={resetQuiz}>ulang quiz</button>
                </>
              )}

              <button onClick={() => setPage("gifts")}>return</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App