import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import theme from '../../theme'

const dimensions = Dimensions.get('window')

export const Container = styled.View`
  width: ${dimensions.width}px;
  position: absolute;
  z-index: 1;
  background-color: ${theme.colors.gray[500]};
  padding-bottom: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  color: ${theme.colors.gray[100]};
  font-size: ${theme.fontSize.sm};
  font-family: ${theme.fontFamily.regular};
  margin-left: 4px;
`
