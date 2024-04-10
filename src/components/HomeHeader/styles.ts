import styled from 'styled-components/native'
import theme from '../../theme'
import { Image } from 'expo-image'

export const Container = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.gray[700]};
`

export const Greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const Message = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.md};
  font-family: ${theme.fontFamily.regular};
`

export const Name = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.lg};
  font-family: ${theme.fontFamily.bold};
`

export const Picture = styled(Image)`
  width: 54px;
  height: 54px;
  border-radius: 7px;
`
