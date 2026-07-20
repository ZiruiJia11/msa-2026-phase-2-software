import wildPowerChampion from '../assets/wild-power-champion.png'

interface PixelAvatarProps {
  decorative?: boolean
}

export default function PixelAvatar({ decorative = false }: PixelAvatarProps) {
  return (
    <img
      className="pixel-avatar"
      src={wildPowerChampion}
      alt={decorative ? '' : 'FitQuest Wild Power Champion pixel avatar'}
      aria-hidden={decorative}
    />
  )
}
