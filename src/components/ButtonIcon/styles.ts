import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[600]};
`
