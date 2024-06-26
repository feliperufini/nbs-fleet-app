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
`

export const Message = styled.Text`
  color: ${theme.colors.gray[100]};
  font-family: ${theme.fontFamily.regular};
  text-align: center;
  margin: 24px;
  margin-bottom: 36px;
`

export const MessageContent = styled.View`
  flex: 1;
  justify-content: center;
  padding: 24px;
`
