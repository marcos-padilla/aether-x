import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const wait = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms))

export const reduceUserEmailLenght = (
	email: string | null | undefined,
	length = 3
) => {
	if (!email) return ''
	const [name, domain] = email.split('@')
	const reducedName =
		name.length > length ? `${name.slice(0, length)}...` : name
	return `${reducedName}@${domain}`
}

export const isDarkColor = (colorHex: string) => {
	// Remove '#' if present
	colorHex = colorHex.replace('#', '')

	if (!colorHex) return true

	// Convert hexadecimal color to RGB
	const r = parseInt(colorHex.substr(0, 2), 16)
	const g = parseInt(colorHex.substr(2, 2), 16)
	const b = parseInt(colorHex.substr(4, 2), 16)

	// Calculate relative luminance
	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255

	// If luminance is less than or equal to 0.5, the color is darker than white
	return luminance <= 0.5
}

export function filterUndefiedValues<T extends { [key: string]: any }>(obj: T) {
	return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v)) as T
}

export function formatFileSize(bytes?: number) {
	if (!bytes) {
		return '0 Bytes'
	}
	bytes = Number(bytes)
	if (bytes === 0) {
		return '0 Bytes'
	}
	const k = 1024
	const dm = 2
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
