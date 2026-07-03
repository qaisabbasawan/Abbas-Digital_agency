import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WHATSAPP_NUMBER = '16677662781'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

/* Floating WhatsApp launcher, fixed to bottom-right on every public page.
   Auto-pops a "Chat with us" bubble a few seconds after load to draw the
   eye, then stays available on hover. */
export default function WhatsAppButton() {
  const [autoPeek, setAutoPeek] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const openTimer = setTimeout(() => setAutoPeek(true), 2500)
    const closeTimer = setTimeout(() => setAutoPeek(false), 9000)
    return () => {
      clearTimeout(openTimer)
      clearTimeout(closeTimer)
    }
  }, [])

  const showBubble = !dismissed && (autoPeek || hovered)

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative mb-1 flex items-center gap-2 rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-xl shadow-black/30"
          >
            <button
              type="button"
              aria-label="Dismiss"
              onClick={(e) => {
                e.stopPropagation()
                setDismissed(true)
                setAutoPeek(false)
              }}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-bg-dark text-white/70 text-xs leading-none shadow-md hover:text-white"
            >
              &times;
            </button>
            <span className="text-xl">👋</span>
            <p className="whitespace-nowrap text-sm font-medium text-bg-dark">
              Chat with us on WhatsApp
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.9], opacity: [0.55, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.9], opacity: [0.55, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1 }}
        />

        <motion.svg
          viewBox="0 0 32 32"
          className="relative h-8 w-8"
          fill="#ffffff"
          aria-hidden="true"
          whileHover={{ rotate: [0, -12, 12, -8, 0] }}
          transition={{ duration: 0.5 }}
        >
          <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.386.696 4.611 1.899 6.484L4 29l7.7-1.867A11.94 11.94 0 0 0 16.004 27C22.632 27 28 21.627 28 15S22.632 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.363l-.357-.212-4.573 1.108 1.222-4.457-.233-.372A9.78 9.78 0 0 1 5.727 15c0-5.673 4.604-10.278 10.277-10.278S26.28 9.327 26.28 15c0 5.673-4.604 9.818-10.276 9.818Zm5.634-7.352c-.309-.155-1.827-.902-2.11-1.005-.283-.103-.489-.155-.695.155-.206.31-.798 1.005-.978 1.211-.18.206-.36.232-.669.077-.309-.155-1.304-.481-2.484-1.535-.918-.819-1.538-1.83-1.718-2.14-.18-.31-.019-.477.136-.631.14-.14.31-.36.464-.541.155-.18.206-.31.31-.516.103-.206.051-.387-.026-.542-.077-.155-.695-1.677-.953-2.297-.251-.603-.507-.522-.695-.532l-.593-.01a1.14 1.14 0 0 0-.824.387c-.283.31-1.082 1.058-1.082 2.58 0 1.522 1.108 2.993 1.263 3.199.155.206 2.18 3.33 5.283 4.669.738.319 1.314.51 1.763.652.741.236 1.415.203 1.948.123.594-.089 1.827-.747 2.085-1.469.258-.722.258-1.34.18-1.469-.077-.129-.283-.206-.592-.361Z" />
        </motion.svg>
      </motion.a>
    </div>
  )
}
