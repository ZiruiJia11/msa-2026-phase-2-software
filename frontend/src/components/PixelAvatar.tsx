interface PixelAvatarProps {
  decorative?: boolean
}

export default function PixelAvatar({ decorative = false }: PixelAvatarProps) {
  return (
    <div className="pixel-avatar" aria-hidden={decorative} aria-label={decorative ? undefined : 'FitQuest pixel avatar'}>
      <span className="pixel-avatar__hair" />
      <span className="pixel-avatar__head" />
      <span className="pixel-avatar__torso" />
      <span className="pixel-avatar__arm pixel-avatar__arm--left" />
      <span className="pixel-avatar__arm pixel-avatar__arm--right" />
      <span className="pixel-avatar__leg pixel-avatar__leg--left" />
      <span className="pixel-avatar__leg pixel-avatar__leg--right" />
    </div>
  )
}
