import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'styled-components'
import { Container, SizeProps } from './styles'

export type IconBoxProps = (props: IconProps) => JSX.Element

type Props = {
  size?: SizeProps
  icon: IconBoxProps
}

export function IconBox({ size = 'MEDIUM', icon: Icon }: Props) {
  const { colors } = useTheme()

  const iconSize = size === 'MEDIUM' ? 24 : 16

  return (
    <Container size={size}>
      <Icon
        size={iconSize}
        color={colors.brandLight}
      />
    </Container>
  )
}