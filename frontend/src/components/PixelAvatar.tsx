import wildPowerChampion from '../assets/wild-power-champion.png'
import ironWillAscendant from '../assets/iron-will-ascendant.png'

export interface AvatarStage {
  id: 'rookie' | 'champion' | 'ascendant'
  name: string
  minLevel: number
  description: string
  image: string
}

export const avatarStages: AvatarStage[] = [
  {
    id: 'rookie',
    name: 'Rookie Challenger',
    minLevel: 1,
    description: 'Basic form for new FitQuest players.',
    image: wildPowerChampion,
  },
  {
    id: 'champion',
    name: 'Wild Power Champion',
    minLevel: 3,
    description: 'Unlocked after building early workout consistency.',
    image: wildPowerChampion,
  },
  {
    id: 'ascendant',
    name: 'Iron Will Ascendant',
    minLevel: 5,
    description: 'Ultimate form for committed quest streaks.',
    image: ironWillAscendant,
  },
]

export function getAvatarStage(level = 1) {
  const safeLevel = Math.max(1, level)
  return avatarStages.reduce(
    (current, stage) => (safeLevel >= stage.minLevel ? stage : current),
    avatarStages[0],
  )
}

interface PixelAvatarProps {
  decorative?: boolean
  level?: number
  showStage?: boolean
}

export default function PixelAvatar({
  decorative = false,
  level = 1,
  showStage = false,
}: PixelAvatarProps) {
  const stage = getAvatarStage(level)

  return (
    <span className={`pixel-avatar-group pixel-avatar-group--${stage.id}`}>
      <span className="pixel-avatar-wrap">
        <img
          className="pixel-avatar"
          src={stage.image}
          alt={decorative ? '' : `FitQuest ${stage.name} pixel avatar`}
          aria-hidden={decorative}
        />
        <span className="pixel-avatar-shadow" aria-hidden="true" />
      </span>
      {showStage && (
        <span className="avatar-stage-label">
          <strong>{stage.name}</strong>
          <span>Level {level}</span>
        </span>
      )}
    </span>
  )
}
