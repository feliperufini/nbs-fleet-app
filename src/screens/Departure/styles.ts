import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.gray[800]};
`

export const Content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`

export const Message = styled.Text`
  color: ${theme.colors.gray[100]};
  font-family: ${theme.fontFamily.regular};
  text-align: center;
  margin: 24px;
`
