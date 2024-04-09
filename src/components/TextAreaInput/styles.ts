import styled from 'styled-components/native'
import theme from '../../theme'

export const Container = styled.View`
	width: 100%;
	height: 150px;
	padding: 16px;
	border-radius: 6px;
	background-color: ${theme.colors.gray[700]};
`

export const Label = styled.Text`
	color: ${theme.colors.gray[300]};
	font-size: ${theme.fontSize.sm};
	font-family: ${theme.fontFamily.regular};
`

export const Input = styled.TextInput`
	color: ${theme.colors.gray[200]};
	font-size: ${theme.fontSize.md};
	font-family: ${theme.fontFamily.regular};
	vertical-align: top;
	margin-top: 16px;
`
