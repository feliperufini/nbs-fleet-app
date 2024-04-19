import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.TouchableOpacity`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.brandDark};
`

export const Title = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  font-family: ${theme.fontFamily.bold};
`

export const Loading = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.colors.brandMid,
}))``
