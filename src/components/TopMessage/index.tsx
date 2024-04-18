import { useTheme } from 'styled-components/native'
import { IconProps } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Container, Title } from './styles'

type IconBoxProps = (props: IconProps) => JSX.Element

type Props = {
  icon?: IconBoxProps
  title: string
}

export function TopMessage({ title, icon: Icon }: Props) {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const paddingTop = insets.top

  return (
    <Container style={{ paddingTop }}>
      {
        Icon &&
        <Icon size={18} color={colors.gray[100]} />
      }
      <Title>{title}</Title>
    </Container>
  )
}