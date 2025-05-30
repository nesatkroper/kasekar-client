"use client"

import type React from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useState, useCallback } from "react"

export default function BlockedPage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [debugInfo, setDebugInfo] = useState<{ mode?: string }>({})

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  useEffect(() => {
    setMounted(true)

    // Disable navigation
    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", () => {
      window.history.pushState(null, "", window.location.href)
    })

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Get debug info
    fetch("/api/debug")
      .then((res) => res.json())
      .then((data) => setDebugInfo(data))
      .catch((err) => console.error("Failed to fetch debug info:", err))

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    },
    [mouseX, mouseY],
  )

  if (!mounted) return null

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Floating bubbles background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-200/30 to-purple-200/30"
            style={{
              width: Math.random() * 100 + 20,
              height: Math.random() * 100 + 20,
            }}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.6, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Main container */}
      <motion.div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* Central content card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-2xl w-full"
        >
          {/* Soft glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Main card */}
          <motion.div
            className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 p-12 text-center shadow-2xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Friendly status indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center mb-8"
            >
              <motion.div
                className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-200"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                    "0 0 30px rgba(59, 130, 246, 0.3)",
                    "0 0 20px rgba(59, 130, 246, 0.2)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-blue-600 text-sm font-medium">Temporarily Unavailable</span>
              </motion.div>
            </motion.div>

            {/* Friendly icon */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.div
                className="w-24 h-24 mx-auto relative"
                animate={{
                  y: [-5, 5, -5],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <motion.svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </motion.svg>
                </div>
              </motion.div>
            </motion.div>

            {/* Friendly title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mb-8"
            >
              <motion.h1
                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 mb-4"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Taking a Break
              </motion.h1>

              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 1.2, duration: 1 }}
              />
            </motion.div>

            {/* Time display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
            >
              <div className="text-2xl font-light text-gray-600 mb-2">Current Time</div>
              <div className="text-4xl font-bold text-blue-600">{formatTime(currentTime)}</div>
            </motion.div>

            {/* Friendly messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="space-y-6 mb-8"
            >
              <motion.p
                className="text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                🌟 Website currently blocked. Please contact the developer.
              </motion.p>

              <motion.p
                className="text-2xl text-gray-700 leading-relaxed font-medium"
                lang="km"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                ✨ គេហទំព័រនេះត្រូវបានរារាំងសូមទាក់ទងអ្នកអភិវឌ្ឍន៍។
              </motion.p>
            </motion.div>

            {/* Contact section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
            >
              <motion.div
                className="flex items-center justify-center space-x-3"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="text-gray-600">💬 Need help? Feel free to reach out to our support team!</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Debug info */}
      {process.env.NODE_ENV !== "production" && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono">
          <div>MODE: {debugInfo.mode || "Loading..."}</div>
        </div>
      )}
    </div>
  )
}



// "use client"

// import type React from "react"
// import { motion, useMotionValue, useTransform } from "framer-motion"
// import { useEffect, useState, useCallback } from "react"

// export default function BlockedPage() {
//   const [mounted, setMounted] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [currentTime, setCurrentTime] = useState(new Date())

//   const mouseX = useMotionValue(0)
//   const mouseY = useMotionValue(0)

//   const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
//   const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

//   useEffect(() => {
//     setMounted(true)

//     // Only disable navigation when this page is actually being used for blocking
//     // (Don't disable if user manually navigated here during normal operation)
//     const urlParams = new URLSearchParams(window.location.search)
//     const isBlocked = urlParams.get("blocked") !== null || window.location.pathname === "/blocked"

//     if (isBlocked) {
//       window.history.pushState(null, "", window.location.href)
//       window.addEventListener("popstate", () => {
//         window.history.pushState(null, "", window.location.href)
//       })
//     }

//     // Update time every second
//     const timeInterval = setInterval(() => {
//       setCurrentTime(new Date())
//     }, 1000)

//     return () => {
//       clearInterval(timeInterval)
//     }
//   }, [])

//   const handleMouseMove = useCallback(
//     (e: React.MouseEvent) => {
//       const rect = e.currentTarget.getBoundingClientRect()
//       const x = e.clientX - rect.left - rect.width / 2
//       const y = e.clientY - rect.top - rect.height / 2

//       setMousePosition({ x, y })
//       mouseX.set(x)
//       mouseY.set(y)
//     },
//     [mouseX, mouseY],
//   )

//   if (!mounted) return null

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-US", {
//       hour12: true,
//       hour: "numeric",
//       minute: "2-digit",
//     })
//   }

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Floating bubbles background */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-gradient-to-r from-blue-200/30 to-purple-200/30"
//             style={{
//               width: Math.random() * 100 + 20,
//               height: Math.random() * 100 + 20,
//             }}
//             initial={{
//               x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
//               y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
//               opacity: 0,
//             }}
//             animate={{
//               y: -100,
//               opacity: [0, 0.6, 0],
//               scale: [1, 1.2, 1],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 10,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "linear",
//               delay: Math.random() * 5,
//             }}
//           />
//         ))}
//       </div>

//       {/* Gentle wave pattern */}
//       <div className="absolute inset-0 opacity-20">
//         <svg className="w-full h-full">
//           <defs>
//             <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#3b82f6" />
//               <stop offset="50%" stopColor="#8b5cf6" />
//               <stop offset="100%" stopColor="#06b6d4" />
//             </linearGradient>
//           </defs>
//           <motion.path
//             d="M0,100 Q250,50 500,100 T1000,100 L1000,0 L0,0 Z"
//             fill="url(#waveGradient)"
//             initial={{ pathLength: 0, opacity: 0 }}
//             animate={{ pathLength: 1, opacity: 0.3 }}
//             transition={{ duration: 3, ease: "easeInOut" }}
//           />
//         </svg>
//       </div>

//       {/* Main container */}
//       <motion.div
//         className="min-h-screen flex items-center justify-center px-4"
//         style={{
//           rotateX,
//           rotateY,
//         }}
//       >
//         {/* Central content card */}
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0, y: 50 }}
//           animate={{ scale: 1, opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="relative max-w-2xl w-full"
//         >
//           {/* Soft glow effect */}
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl blur-3xl"
//             animate={{
//               scale: [1, 1.1, 1],
//               opacity: [0.3, 0.5, 0.3],
//             }}
//             transition={{
//               duration: 4,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//           />

//           {/* Main card */}
//           <motion.div
//             className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 p-12 text-center shadow-2xl"
//             whileHover={{ scale: 1.02, y: -5 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             {/* Friendly status indicator */}
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//               className="flex items-center justify-center mb-8"
//             >
//               <motion.div
//                 className="flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-200"
//                 animate={{
//                   boxShadow: [
//                     "0 0 20px rgba(59, 130, 246, 0.2)",
//                     "0 0 30px rgba(59, 130, 246, 0.3)",
//                     "0 0 20px rgba(59, 130, 246, 0.2)",
//                   ],
//                 }}
//                 transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//               >
//                 <motion.div
//                   className="w-3 h-3 bg-blue-500 rounded-full"
//                   animate={{
//                     scale: [1, 1.2, 1],
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//                 <span className="text-blue-600 text-sm font-medium">Temporarily Unavailable</span>
//               </motion.div>
//             </motion.div>

//             {/* Friendly icon */}
//             <motion.div
//               initial={{ scale: 0, rotate: -10 }}
//               animate={{ scale: 1, rotate: 0 }}
//               transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
//               className="mb-8"
//             >
//               <motion.div
//                 className="w-24 h-24 mx-auto relative"
//                 animate={{
//                   y: [-5, 5, -5],
//                 }}
//                 transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
//               >
//                 <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
//                   <motion.svg
//                     className="w-12 h-12 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     initial={{ pathLength: 0 }}
//                     animate={{ pathLength: 1 }}
//                     transition={{ delay: 1, duration: 1.5 }}
//                   >
//                     <motion.path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </motion.svg>
//                 </div>

//                 {/* Floating sparkles */}
//                 {[...Array(6)].map((_, i) => (
//                   <motion.div
//                     key={i}
//                     className="absolute w-2 h-2 bg-yellow-400 rounded-full"
//                     style={{
//                       top: `${Math.random() * 100}%`,
//                       left: `${Math.random() * 100}%`,
//                     }}
//                     animate={{
//                       scale: [0, 1, 0],
//                       opacity: [0, 1, 0],
//                       rotate: [0, 180, 360],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Number.POSITIVE_INFINITY,
//                       delay: i * 0.3,
//                     }}
//                   />
//                 ))}
//               </motion.div>
//             </motion.div>

//             {/* Friendly title */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8, duration: 0.6 }}
//               className="mb-8"
//             >
//               <motion.h1
//                 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 mb-4"
//                 animate={{
//                   backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
//                 }}
//                 transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
//                 style={{
//                   backgroundSize: "200% 200%",
//                 }}
//               >
//                 Taking a Break
//               </motion.h1>

//               <motion.div
//                 className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full"
//                 initial={{ width: 0 }}
//                 animate={{ width: "60%" }}
//                 transition={{ delay: 1.2, duration: 1 }}
//               />
//             </motion.div>

//             {/* Time display */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.4 }}
//               className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
//             >
//               <div className="text-2xl font-light text-gray-600 mb-2">Current Time</div>
//               <div className="text-4xl font-bold text-blue-600">{formatTime(currentTime)}</div>
//             </motion.div>

//             {/* Friendly messages */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.6 }}
//               className="space-y-6 mb-8"
//             >
//               <motion.p
//                 className="text-xl text-gray-600 leading-relaxed"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.8, duration: 0.6 }}
//               >
//                 🌟 Website currently blocked. Please contact the developer.
//               </motion.p>

//               <motion.p
//                 className="text-2xl text-gray-700 leading-relaxed font-medium"
//                 lang="km"
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 2, duration: 0.6 }}
//               >
//                 ✨ គេហទំព័រនេះត្រូវបានរារាំងសូមទាក់ទងអ្នកអភិវឌ្ឍន៍។
//               </motion.p>
//             </motion.div>

//             {/* Contact section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 2.2 }}
//               className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200"
//             >
//               <motion.div
//                 className="flex items-center justify-center space-x-3"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 25 }}
//               >
//                 <motion.div
//                   className="w-3 h-3 bg-green-400 rounded-full"
//                   animate={{
//                     opacity: [1, 0.5, 1],
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 />
//                 <span className="text-gray-600">💬 Need help? Feel free to reach out to our support team!</span>
//               </motion.div>
//             </motion.div>

//             {/* Decorative elements */}
//             <motion.div
//               className="absolute top-6 right-6"
//               animate={{
//                 rotate: [0, 360],
//               }}
//               transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//             >
//               <div className="w-8 h-8 border-2 border-blue-200 rounded-full opacity-50" />
//             </motion.div>

//             <motion.div
//               className="absolute bottom-6 left-6"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.3, 0.6, 0.3],
//               }}
//               transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//             >
//               <div className="w-6 h-6 bg-purple-200 rounded-full opacity-50" />
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Friendly corner decorations */}
//       {[...Array(4)].map((_, i) => (
//         <motion.div
//           key={i}
//           className={`absolute w-20 h-20 ${
//             i === 0 ? "top-8 left-8" : i === 1 ? "top-8 right-8" : i === 2 ? "bottom-8 right-8" : "bottom-8 left-8"
//           }`}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 2.5 + i * 0.1, duration: 0.5 }}
//         >
//           <motion.div
//             className="w-full h-full border-2 border-blue-200 rounded-full opacity-30"
//             animate={{
//               rotate: [0, 360],
//             }}
//             transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//         </motion.div>
//       ))}

//       {/* Gentle status bar */}
//       <motion.div
//         initial={{ y: 100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 3, duration: 0.8 }}
//         className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm border-t border-blue-100 p-4"
//       >
//         <div className="flex justify-center items-center text-sm text-gray-500">
//           <span>🌈 Thank you for your patience • We'll be back soon!</span>
//         </div>
//       </motion.div>
//     </div>
//   )
// }
