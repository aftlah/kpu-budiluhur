import  { useState, useEffect } from 'react'
import { ChevronRight, UserCheck, Lock } from 'lucide-react'
import Swal from 'sweetalert2'
import { motion, AnimatePresence } from 'framer-motion'
import { options } from './utils/candidates';

export default function VotingApp() {
	const [selectedOption, setSelectedOption] = useState(null)
	const [voteCount, setVoteCount] = useState({ option1: 0, option2: 0 })
	const [hasVoted, setHasVoted] = useState(false)
	const [showResults, setShowResults] = useState(false)
	const [password, setPassword] = useState('')

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
						title: '!text-xl !font-bold !text-gray-800',
						htmlContainer: '!text-base !text-gray-600',
						confirmButton: '!bg-blue-600 !text-white !px-6 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-blue-700',
						cancelButton: '!bg-gray-300 !text-gray-800 !px-6 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-gray-400'
					}
				}).then((result) => {
					if (result.isConfirmed) {
						const newVoteCount = { ...voteCount }
						newVoteCount[`option${selectedOption}`] += 1
						setVoteCount(newVoteCount)
						localStorage.setItem('voteCount', JSON.stringify(newVoteCount))
						localStorage.setItem('hasVoted', 'true')

						Swal.fire({
							title: 'Suara Anda Telah Diterima!',
							html: `Anda memilih:<br><strong>${candidate.ketua.name}</strong> dan <strong>${candidate.wakil.name}</strong>.`,
							icon: 'success',
							confirmButtonText: 'OK',
							customClass: {
								container: '!font-sans',
								title: '!text-xl !font-bold !text-green-600',
								htmlContainer: '!text-base !text-gray-600',
								confirmButton: '!bg-green-600 !text-white !px-6 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-green-700'
							}
						})

						setHasVoted(true)
						setSelectedOption(null)
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
					title: '!text-xl !font-bold !text-yellow-600',
					htmlContainer: '!text-base !text-gray-600',
					confirmButton: '!bg-yellow-600 !text-white !px-6 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-yellow-700'
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
					title: '!text-xl !font-bold !text-red-600',
					htmlContainer: '!text-base !text-gray-600',
					confirmButton: '!bg-red-600 !text-white !px-6 !py-2 !rounded-lg !font-semibold !text-sm hover:!bg-red-700'
				}
			})
		}
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleShowResults();
		}
	}

	const handleCloseResults = () => {
		setShowResults(false);
		setPassword('');
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
			<motion.div
				className="bg-white px-8 py-5 rounded-2xl shadow-xl w-full max-w-2xl"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="text-4xl font-bold mb-3 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
					Pemilihan Ketua dan Wakil Ketua
				</h1>

				<h2 className="text-2xl font-semibold mb-3 text-center text-gray-700">Pilih Pasangan:</h2>
				<div className="space-y-6">
					{options.map((option) => (
						<label
							key={option.id}
							className={`flex items-center space-x-10 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${selectedOption === option.id
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
							<div className="flex-1 flex justify-between items-center">
								{[option.ketua, option.wakil].map((candidate) => (
									<div key={candidate.id} className="text-center transition-transform duration-300 transform hover:scale-105">
										<img
											src={candidate.photo}
											alt={candidate.name}
											className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
										/>
										<h3 className="font-semibold text-lg text-gray-800">{candidate.name}</h3>
										<p className="text-sm text-gray-600">{candidate.nim}</p>
										<p className={`text-sm font-medium mt-1 inline-block px-3 py-1 rounded-full ${candidate.role === 'Ketua' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
											}`}>
											{candidate.role}
										</p>
									</div>
								))}
							</div>
							<ChevronRight className={`h-6 w-6 ${selectedOption === option.id ? 'text-blue-500' : 'text-gray-400'}`} />
						</label>
					))}
				</div>
				<button
					onClick={handleSubmit}
					disabled={!selectedOption}
					className="mt-5 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
				>
					<UserCheck className="mr-2 h-6 w-6" />
					Pilih
				</button>

				{!showResults && (
					<motion.div
						className="mt-6 pt-6 border-t border-gray-200"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
					>
						<h3 className="text-lg font-semibold mb-2 text-gray-700">Lihat Hasil</h3>
						<div className="flex items-center space-x-2">
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onKeyPress={handleKeyPress}
								placeholder="Masukkan password"
								className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
							/>
							<button
								onClick={handleShowResults}
								className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center"
							>
								<Lock className="mr-2 h-4 w-4" />
								Lihat Hasil
							</button>
						</div>
					</motion.div>
				)}

				<AnimatePresence>
					{showResults && (
						<motion.div
							className="mt-8 space-y-6"
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.5 }}
						>
							<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Hasil Pemilihan</h2>
							{options.map((option) => (
								<motion.div
									key={option.id}
									className="flex justify-between items-center p-6 border-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: option.id * 0.1 }}
								>
									<div>
										<p className="font-semibold text-lg text-gray-800">{option.ketua.name} & {option.wakil.name}</p>
										<p className="text-sm text-gray-600">Pasangan {option.id}</p>
									</div>
									<div className="text-right">
										<p className="text-2xl font-bold text-blue-600">{voteCount[`option${option.id}`] ?? 0} suara</p>
										<p className="text-sm text-gray-600">
											{((voteCount[`option${option.id}`] / (voteCount.option1 + voteCount.option2)) * 100).toFixed(2)}%
										</p>
									</div>
								</motion.div>
							))}
							<motion.button
								onClick={handleCloseResults}
								className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								Tutup Hasil
							</motion.button>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}