import wildPowerChampion from '../assets/wild-power-champion.png'

interface PixelAvatarProps {
  decorative?: boolean
}

export default function PixelAvatar({ decorative = false }: PixelAvatarProps) {
  return (
    <span className="pixel-avatar-wrap">
      <img
        className="pixel-avatar"
        src={wildPowerChampion}
        alt={decorative ? '' : 'FitQuest Wild Power Champion pixel avatar'}
        aria-hidden={decorative}
      />
      <span className="pixel-avatar-shadow" aria-hidden="true" />
    </span>
  )
}
