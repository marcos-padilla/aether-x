'use client'

import { User } from '@prisma/client'
import { createContext, useContext, useEffect, useState } from 'react'

interface ModalProviderProps {
	children: React.ReactNode
}

export type ModalData = {
	user?: User
}

type ModalContextType = {
	data: ModalData
	isOpen: boolean
	setOpen: (modal: React.ReactNode, data?: ModalData) => void
	setClose: () => void
}

export const ModalContext = createContext<ModalContextType>({
	data: {},
	isOpen: false,
	setOpen: (modal: React.ReactNode, data?: ModalData) => {},
	setClose: () => {},
})

export const useModal = () => {
	const context = useContext(ModalContext)
	if (!context) {
		throw new Error('useModal must be used within a ModalProvider')
	}
	return context
}

export default function ModalProvider({ children }: ModalProviderProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<ModalData>({})
	const [showingModal, setShowingModal] = useState<React.ReactNode>(null)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	const setOpen = async (modal: React.ReactNode, data: ModalData = {}) => {
		if (data) {
			setData(data)
		}

		setShowingModal(modal)
		setIsOpen(true)
	}

	const setClose = () => {
		setIsOpen(false)
		setData({})
	}

	if (!isMounted) return null
	return (
		<ModalContext.Provider value={{ data, isOpen, setOpen, setClose }}>
			{children}
			{showingModal}
		</ModalContext.Provider>
	)
}
