import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[800]};
`

export const Content = styled.View`
  flex: 1;
  padding: 0 32px;
`

export const Title = styled.Text`
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  font-family: ${theme.fontFamily.bold};
  margin-bottom: 12px;
`

export const Label = styled.Text`
  color: ${theme.colors.gray[400]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.regular};
  margin-top: 32px;
  text-align: center;
`
