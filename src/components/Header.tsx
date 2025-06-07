import { Box, Flex, Heading, Spacer, useColorModeValue } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const Header = () => {
  const bg = useColorModeValue('white', 'gray.800')
  const border = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as="header"
      px={6}
      py={4}
      bg={bg}
      borderBottomWidth="1px"
      borderColor={border}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={999}
    >
      <Flex align="center">
        <Heading size="md">WeWantWaste</Heading>
        <Spacer />
        <ColorModeSwitcher />
      </Flex>
    </Box>
  )
}

export default Header
