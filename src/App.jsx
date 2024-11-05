// import { useState, useEffect } from 'react'
// import { ChevronRight, UserCheck, Lock } from 'lucide-react'
// import Swal from 'sweetalert2'
// import { motion, AnimatePresence } from 'framer-motion'

// const candidates = [
// 	{ id: 1, name: 'Alice Johnson', nim: '12345678', role: 'Ketua', photo: 'https://via.placeholder.com/100' },
// 	{ id: 2, name: 'Charlie Brown', nim: '23456789', role: 'Wakil Ketua', photo: 'https://via.placeholder.com/100' },
// 	{ id: 3, name: 'Bob Smith', nim: '34567890', role: 'Ketua', photo: 'https://via.placeholder.com/100' },
// 	{ id: 4, name: 'Daisy Miller', nim: '45678901', role: 'Wakil Ketua', photo: 'https://via.placeholder.com/100' },
// ]

// const options = [
// 	{ id: 1, ketua: candidates[0], wakil: candidates[1] },
// 	{ id: 2, ketua: candidates[2], wakil: candidates[3] },
// ]

// export default function VotingApp() {
// 	const [selectedOption, setSelectedOption] = useState(null)
// 	const [voteCount, setVoteCount] = useState({ option1: 0, option2: 0 })
// 	const [hasVoted, setHasVoted] = useState(false)
// 	const [showResults, setShowResults] = useState(false)
// 	const [password, setPassword] = useState('')

// 	useEffect(() => {
// 		const savedVoteCount = localStorage.getItem('voteCount')
// 		if (savedVoteCount) {
// 			setVoteCount(JSON.parse(savedVoteCount))
// 		}
// 		const userHasVoted = localStorage.getItem('hasVoted')
// 		if (userHasVoted) {
// 			setHasVoted(true)
// 		}
// 	}, [])

// 	const handleSubmit = () => {
// 		if (selectedOption) {
// 			const candidate = options.find(option => option.id === selectedOption)
// 			if (candidate) {
// 				Swal.fire({
// 					title: 'Konfirmasi Pilihan',
// 					html: `Apakah Anda yakin ingin memilih:<br><strong>${candidate.ketua.name}</strong> sebagai Ketua<br>dan<br><strong>${candidate.wakil.name}</strong> sebagai Wakil Ketua?`,
// 					icon: 'question',
// 					showCancelButton: true,
// 					confirmButtonText: 'Ya, pilih!',
// 					cancelButtonText: 'Tidak, batal',
// 					customClass: {
// 						container: '!font-sans',
// 						title: '!text-lg sm:!text-xl !font-bold !text-gray-800',
// 						htmlContainer: '!text-sm sm:!text-base !text-gray-600',
// 						confirmButton: '!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-blue-700',
// 						cancelButton: '!bg-gray-300 !text-gray-800 !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-gray-400'
// 					}
// 				}).then((result) => {
// 					if (result.isConfirmed) {
// 						const newVoteCount = { ...voteCount }
// 						newVoteCount[`option${selectedOption}`] += 1
// 						setVoteCount(newVoteCount)
// 						localStorage.setItem('voteCount', JSON.stringify(newVoteCount))
// 						localStorage.setItem('hasVoted', 'true')

// 						Swal.fire({
// 							title: 'Suara Anda Telah Diterima!',
// 							html: `Anda memilih:<br><strong>${candidate.ketua.name}</strong> dan <strong>${candidate.wakil.name}</strong>.`,
// 							icon: 'success',
// 							confirmButtonText: 'OK',
// 							customClass: {
// 								container: '!font-sans',
// 								title: '!text-lg sm:!text-xl !font-bold !text-green-600',
// 								htmlContainer: '!text-sm sm:!text-base !text-gray-600',
// 								confirmButton: '!bg-green-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-green-700'
// 							}
// 						})

// 						setHasVoted(true)
// 						setSelectedOption(null)
// 					}
// 				})
// 			}
// 		} else {
// 			Swal.fire({
// 				title: 'Peringatan!',
// 				text: 'Silakan pilih salah satu pasangan.',
// 				icon: 'warning',
// 				confirmButtonText: 'OK',
// 				customClass: {
// 					container: '!font-sans',
// 					title: '!text-lg sm:!text-xl !font-bold !text-yellow-600',
// 					htmlContainer: '!text-sm sm:!text-base !text-gray-600',
// 					confirmButton: '!bg-yellow-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-yellow-700'
// 				}
// 			})
// 		}
// 	}

// 	const handleShowResults = () => {
// 		if (password === 'altaf') {
// 			setShowResults(true)
// 		} else {
// 			Swal.fire({
// 				title: 'Peringatan!',
// 				text: 'Password salah.',
// 				icon: 'error',
// 				confirmButtonText: 'OK',
// 				customClass: {
// 					container: '!font-sans',
// 					title: '!text-lg sm:!text-xl !font-bold !text-red-600',
// 					htmlContainer: '!text-sm sm:!text-base !text-gray-600',
// 					confirmButton: '!bg-red-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-red-700'
// 				}
// 			})
// 		}
// 	}

// 	const handleKeyPress = (event) => {
// 		if (event.key === 'Enter') {
// 			handleShowResults();
// 		}
// 	}

// 	const handleCloseResults = () => {
// 		setShowResults(false);
// 		setPassword('');
// 	};

// 	return (
// 		<div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-purple-100">
// 			<motion.div
// 				className="w-full max-w-2xl px-4 py-5 bg-white shadow-xl sm:px-8 rounded-2xl"
// 				initial={{ opacity: 0, y: 20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.5 }}
// 			>
// 				<h1 className="mb-3 text-2xl font-bold text-center text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
// 					Pemilihan Presiden Mahasiswa dan Wakil Presiden Mahasiswa
// 				</h1>

// 				<h2 className="mb-3 text-xl font-semibold text-center text-gray-700 sm:text-2xl">Pilih Pasangan:</h2>
// 				<div className="space-y-4 sm:space-y-6">
// 					{options.map((option) => (
// 						<label
// 							key={option.id}
// 							className={`flex flex-col sm:flex-row items-center sm:space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${selectedOption === option.id
// 									? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
// 									: 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
// 								}`}
// 						>
// 							<input
// 								type="radio"
// 								name="candidate"
// 								value={option.id}
// 								checked={selectedOption === option.id}
// 								onChange={() => setSelectedOption(option.id)}
// 								className="sr-only"
// 							/>
// 							<div className="flex flex-col items-start justify-between flex-1 space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
// 								{[option.ketua, option.wakil].map((candidate) => (
// 									<div key={candidate.id} className="flex items-center transition-transform duration-300 transform sm:flex-col sm:items-center hover:scale-105">
// 										<img
// 											src={candidate.photo}
// 											alt={candidate.name}
// 											className="object-cover w-16 h-16 mr-4 border-4 border-white rounded-full shadow-lg sm:w-28 sm:h-28 sm:mr-0 sm:mb-3"
// 										/>
// 										<div className="text-left sm:text-center">
// 											<h3 className="text-base font-semibold text-gray-800 sm:text-lg">{candidate.name}</h3>
// 											<p className="text-xs text-gray-600 sm:text-sm">{candidate.nim}</p>
// 											<p className={`text-xs sm:text-sm font-medium mt-1 inline-block px-2 sm:px-3 py-1 rounded-full ${candidate.role === 'Ketua' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
// 												}`}>
// 												{candidate.role}
// 											</p>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 							<ChevronRight className={`h-6 w-6 mt-3 sm:mt-0 ${selectedOption === option.id ? 'text-blue-500' : 'text-gray-400'}`} />
// 						</label>
// 					))}
// 				</div>
// 				<button
// 					onClick={handleSubmit}
// 					disabled={!selectedOption}
// 					className="flex items-center justify-center w-full px-6 py-3 mt-5 text-base font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 sm:text-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
// 				>
// 					<UserCheck className="w-5 h-5 mr-2 sm:h-6 sm:w-6" />
// 					Pilih
// 				</button>

// 				{!showResults && (
// 					<motion.div
// 						className="pt-6 mt-6 border-t border-gray-200"
// 						initial={{ opacity: 0 }}
// 						animate={{ opacity: 1 }}
// 						transition={{ duration: 0.5 }}
// 					>
// 						<h3 className="mb-2 text-base font-semibold text-gray-700 sm:text-lg">Lihat Hasil</h3>
// 						<div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
// 							<input
// 								type="password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								onKeyPress={handleKeyPress}
// 								placeholder="Masukkan password"
// 								className="w-full p-3 transition-all duration-300 border-2 border-gray-300 rounded-lg sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// 							/>
// 							<button
// 								onClick={handleShowResults}
// 								className="flex items-center justify-center w-full px-4 py-3 text-white transition-colors duration-200 bg-green-600 rounded-md sm:w-auto sm:py-2 hover:bg-green-700"
// 							>
// 								<Lock className="w-4 h-4 mr-2" />
// 								Lihat Hasil
// 							</button>
// 						</div>
// 					</motion.div>
// 				)}

// 				<AnimatePresence>
// 					{showResults && (
// 						<motion.div
// 							className="mt-8 space-y-4 sm:space-y-6"
// 							initial={{ opacity: 0, height: 0 }}
// 							animate={{ opacity: 1, height: 'auto' }}
// 							exit={{ opacity: 0, height: 0 }}
// 							transition={{ duration: 0.5 }}
// 						>
// 							<h2 className="mb-4 text-xl font-bold text-center text-gray-800 sm:text-2xl sm:mb-6">Hasil Pemilihan</h2>
// 							{options.map((option) => (
// 								<motion.div
// 									key={option.id}
// 									className="flex flex-col items-center justify-between p-4 border-2 shadow-sm sm:flex-row sm:p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
// 									initial={{ opacity: 0, y: 20 }}
// 									animate={{ opacity: 1, y: 0 }}
// 									transition={{ duration: 0.5, delay: option.id * 0.1 }}
// 								>
// 									<div className="mb-2 text-center sm:text-left sm:mb-0">
// 										<p className="text-base font-semibold text-gray-800 sm:text-lg">{option.ketua.name} & {option.wakil.name}</p>
// 										<p className="text-xs text-gray-600 sm:text-sm">Pasangan {option.id}</p>
// 									</div>
// 									<div className="text-center sm:text-right">
// 										<p className="text-xl font-bold text-blue-600 sm:text-2xl">{voteCount[`option${option.id}`] ?? 0} suara</p>
// 										<p className="text-xs text-gray-600 sm:text-sm">
// 											{((voteCount[`option${option.id}`] / (voteCount.option1 + voteCount.option2)) * 100).toFixed(2)}%
// 										</p>
// 									</div>
// 								</motion.div>
// 							))}
// 							<motion.button
// 								onClick={handleCloseResults}
// 								className="flex items-center justify-center w-full px-6 py-3 mt-4 text-base font-semibold text-white transition-all duration-300 transform rounded-lg sm:mt-6 bg-gradient-to-r from-red-600 to-pink-600 sm:text-lg hover:from-red-700 hover:to-pink-700 hover:scale-105"
// 								whileHover={{ scale: 1.05 }}
// 								whileTap={{ scale: 0.95 }}
// 							>
// 								Tutup Hasil
// 							</motion.button>
// 						</motion.div>
// 					)}

// 				</AnimatePresence>
// 			</motion.div>
// 		</div>
// 	)
// }


import { useState, useEffect } from 'react'
import { ChevronRight, UserCheck, Lock, Mail, Key } from 'lucide-react'
import Swal from 'sweetalert2'
import { motion, AnimatePresence } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'

const candidates = [
  { id: 1, name: 'Alice Johnson', nim: '12345678', role: 'Ketua', photo: 'https://via.placeholder.com/100' },
  { id: 2, name: 'Charlie Brown', nim: '23456789', role: 'Wakil Ketua', photo: 'https://via.placeholder.com/100' },
  { id: 3, name: 'Bob Smith', nim: '34567890', role: 'Ketua', photo: 'https://via.placeholder.com/100' },
  { id: 4, name: 'Daisy Miller', nim: '45678901', role: 'Wakil Ketua', photo: 'https://via.placeholder.com/100' },
]

const options = [
  { id: 1, ketua: candidates[0], wakil: candidates[1] },
  { id: 2, ketua: candidates[2], wakil: candidates[3] },
]

const isAdmin = ['2311500017@student.budiluhur.ac.id','2311500942@student.budiluhur.ac.id'];

export default function AuthenticatedVotingApp() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [voteCount, setVoteCount] = useState({ option1: 0, option2: 0 })
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [secretCode, setSecretCode] = useState('')

  useEffect(() => {
    const savedVoteCount = localStorage.getItem('voteCount')
    if (savedVoteCount) {
      setVoteCount(JSON.parse(savedVoteCount))
    }
    const userHasVoted = localStorage.getItem('hasVoted')
    if (userHasVoted) {
      setHasVoted(true)
    }
  }, [])

  const handleAuthentication = () => {
    const emailPattern = /^[0-9]+@student\.budiluhur\.ac\.id$/;
    if (emailPattern.test(email) && secretCode === '123') {
      setIsAuthenticated(true)
    } else {
      Swal.fire({
        title: 'Login Gagal',
        text: 'Email atau kode rahasia tidak valid. Pastikan login menggunakan email Budi Luhur.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        customClass: {
          container: '!font-sans',
          title: '!text-lg sm:!text-xl !font-bold !text-red-600',
          htmlContainer: '!text-sm sm:!text-base !text-gray-600',
        }
      })
    }
  }

  const handleSubmit = () => {
    if (selectedOption) {
      const candidate = options.find(option => option.id === selectedOption)
      if (candidate) {
        Swal.fire({
          title: 'Konfirmasi Pilihan',
          html: `Apakah Anda yakin ingin memilih:<br><strong>${candidate.ketua.name}</strong> sebagai Ketua<br>dan<br><strong>${candidate.wakil.name}</strong> sebagai Wakil Ketua?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya, pilih!',
          cancelButtonText: 'Tidak, batal',
          customClass: {
            container: '!font-sans',
            title: '!text-lg sm:!text-xl !font-bold !text-gray-800',
            htmlContainer: '!text-sm sm:!text-base !text-gray-600',
            confirmButton: '!bg-blue-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-blue-700',
            cancelButton: '!bg-gray-300 !text-gray-800 !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-gray-400'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const newVoteCount = { ...voteCount }
            newVoteCount[`option${selectedOption}`] += 1
            setVoteCount(newVoteCount)
            localStorage.setItem('voteCount', JSON.stringify(newVoteCount))
            localStorage.setItem('hasVoted', 'true')

            // Show toast notification
            toast.success('Suara anda telah terkirim', {
              duration: 3000,
              position: 'top-right',
              style: {
                background: '#4CAF50',
                color: '#fff',
                fontWeight: 'bold',
              },
            })

            Swal.fire({
              title: 'Suara Anda Telah Diterima!',
              html: `Anda memilih:<br><strong>${candidate.ketua.name}</strong> dan <strong>${candidate.wakil.name}</strong>.`,
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                container: '!font-sans',
                title: '!text-lg sm:!text-xl !font-bold !text-green-600',
                htmlContainer: '!text-sm sm:!text-base !text-gray-600',
                confirmButton: '!bg-green-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-green-700'
              }
            }).then(() => {
              // Redirect to login page after successful vote
              setIsAuthenticated(false)
              setEmail('')
              setSecretCode('')
              setSelectedOption(null)
              setHasVoted(true)
            })
          }
        })
      }
    } else {
      Swal.fire({
        title: 'Peringatan!',
        text: 'Silakan pilih salah satu pasangan.',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          container: '!font-sans',
          title: '!text-lg sm:!text-xl !font-bold !text-yellow-600',
          htmlContainer: '!text-sm sm:!text-base !text-gray-600',
          confirmButton: '!bg-yellow-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-yellow-700'
        }
      })
    }
  }

  const handleShowResults = () => {
    if (password === 'altaf') {
      setShowResults(true)
    } else {
      Swal.fire({
        title: 'Peringatan!',
        text: 'Password salah.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          container: '!font-sans',
          title: '!text-lg sm:!text-xl !font-bold !text-red-600',
          htmlContainer: '!text-sm sm:!text-base !text-gray-600',
          confirmButton: '!bg-red-600 !text-white !px-4 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-red-700'
        }
      })
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if(isAuthenticated){
        handleShowResults();
      }else{
        handleAuthentication();
      }
    }
  }

  const handleCloseResults = () => {
    setShowResults(false);
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-purple-100">
      <Toaster />
      <motion.div
        className="w-full max-w-2xl px-4 py-5 bg-white shadow-xl sm:px-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-3 text-2xl font-bold text-center text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Pemilihan Presiden Mahasiswa dan Wakil Presiden Mahasiswa
        </h1>

        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3 text-xl font-semibold text-center text-gray-700 sm:text-2xl">Login</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-10 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
              </div>
              <div>
                <label htmlFor="secretCode" className="block mb-1 text-sm font-medium text-gray-700">Secret Code</label>
                <div className="relative">
                  <input
                    type="password"
                    id="secretCode"
                    value={secretCode}
                    onKeyUp={handleKeyPress}
                    onChange={(e) => setSecretCode(e.target.value)}
                    
                    className="w-full p-3 pl-10 transition-all duration-300 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter the secret code"
                  />
                  <Key className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                </div>
              </div>
              <button
                onClick={handleAuthentication}
                className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 sm:text-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105"
              >
                <Lock className="w-5 h-5 mr-2 sm:h-6 sm:w-6" />
                Masuk
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            <h2 className="mb-3 text-xl font-semibold text-center text-gray-700 sm:text-2xl">Pilih Pasangan:</h2>
            <div className="space-y-4 sm:space-y-6">
              {options.map((option) => (
                <label
                  key={option.id}
                  className={`flex flex-col sm:flex-row items-center sm:space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${selectedOption === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                >
                  <input
                    type="radio"
                    name="candidate"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-start justify-between flex-1 space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                    {[option.ketua, option.wakil].map((candidate) => (
                      <div key={candidate.id} className="flex items-center transition-transform duration-300 transform sm:flex-col sm:items-center hover:scale-105">
                        <img
                          src={candidate.photo}
                          alt={candidate.name}
                          className="object-cover w-16 h-16 mr-4 border-4 border-white rounded-full shadow-lg sm:w-28 sm:h-28 sm:mr-0 sm:mb-3"
                        />
                        <div className="text-left sm:text-center">
                          <h3 className="text-base font-semibold text-gray-800 sm:text-lg">{candidate.name}</h3>
                          <p className="text-xs text-gray-600 sm:text-sm">{candidate.nim}</p>
                          <p className={`text-xs sm:text-sm font-medium mt-1 inline-block px-2 sm:px-3 py-1 rounded-full ${candidate.role === 'Ketua' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                            {candidate.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <ChevronRight className={`h-6 w-6 mt-3 sm:mt-0 ${selectedOption === option.id ? 'text-blue-500' : 'text-gray-400'}`} />
                </label>
              ))}
            </div>
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="flex items-center justify-center w-full px-6 py-3 mt-5 text-base font-semibold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 sm:text-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <UserCheck className="w-5 h-5 mr-2 sm:h-6 sm:w-6" />
              Pilih
            </button>

            {!showResults && isAdmin.includes(email) && (
              <motion.div
                className="pt-6 mt-6 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="mb-2 text-base font-semibold text-gray-700 sm:text-lg">Lihat Hasil</h3>
                <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Masukkan password"
                    className="w-full p-3 transition-all duration-300 border-2 border-gray-300 rounded-lg sm:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleShowResults}
                    className="flex items-center justify-center w-full px-4 py-3 text-white transition-colors duration-200 bg-green-600 rounded-md sm:w-auto sm:py-2 hover:bg-green-700"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Lihat Hasil
                  </button>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {showResults && (
                <motion.div
                  className="mt-8 space-y-4 sm:space-y-6"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="mb-4 text-xl font-bold text-center text-gray-800 sm:text-2xl sm:mb-6">Hasil Pemilihan</h2>
                  {options.map((option) => (
                    <motion.div
                      key={option.id}
                      className="flex flex-col items-center justify-between p-4 border-2 shadow-sm sm:flex-row sm:p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: option.id * 0.1 }}
                    >
                      <div className="mb-2 text-center sm:text-left sm:mb-0">
                        <p className="text-base font-semibold text-gray-800 sm:text-lg">{option.ketua.name} & {option.wakil.name}</p>
                        <p className="text-xs text-gray-600 sm:text-sm">Pasangan {option.id}</p>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-xl font-bold text-blue-600 sm:text-2xl">{voteCount[`option${option.id}`] ?? 0} suara</p>
                        <p className="text-xs text-gray-600 sm:text-sm">
                          {((voteCount[`option${option.id}`] / (voteCount.option1 + voteCount.option2)) * 100).toFixed(2)}%
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={handleCloseResults}
                    className="flex items-center justify-center w-full px-6 py-3 mt-4 text-base font-semibold text-white transition-all duration-300 transform rounded-lg sm:mt-6 bg-gradient-to-r from-red-600 to-pink-600 sm:text-lg hover:from-red-700 hover:to-pink-700 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Tutup Hasil
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  )
}