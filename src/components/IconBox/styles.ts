import styled, { css } from 'styled-components/native'
import theme from '../../theme'

export type SizeProps = 'SMALL' | 'MEDIUM'

type Props = {
  size: SizeProps,
}

const variantSizeStyles = (size: SizeProps) => {
  return {
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    MEDIUM: css`
      width: 46px;
      height: 46px;
    `
  }[size]
}

export const Container = styled.View<Props>`
  border-radius: 6px;
  background-color: ${theme.colors.gray[700]};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  ${({ size }) => variantSizeStyles(size)};
`