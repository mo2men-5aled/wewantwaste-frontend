import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useToast,
  useColorModeValue,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SkipCard from '../components/SkipCard'
import type { Skip } from '../types'

const MotionBox = motion(Box)

const ChooseSkipSizePage = () => {
  const [skips, setSkips] = useState<Skip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const toast = useToast()

  useEffect(() => {
    fetch(
      'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
    )
      .then((res) => res.json())
      .then((data) => {
        setSkips(data)
        setLoading(false)
      })
      .catch(() => {
        toast({
          title: 'Failed to load skips.',
          description: 'Please try again later.',
          status: 'error',
          isClosable: true,
          duration: 5000,
          position: 'top'
        })
        setLoading(false)
      })
  }, [])

  const bg = useColorModeValue('gray.50', 'gray.900')
  const headerBg = useColorModeValue('white', 'gray.800')

  return (
    <Box as="main" bg={bg} minH="100vh">
      <Box 
        as="header" 
        py={8} 
        bg={headerBg} 
        boxShadow="sm" 
        position="sticky" 
        top={0} 
        zIndex={1}
      >
        <Container maxW="container.xl">
          <VStack spacing={2}>
            <Heading
              as="h1"
              fontSize={{ base: '2xl', md: '4xl' }}
              color="dark"
              textAlign="center"
            >
              Choose Your Skip Size
            </Heading>
            <Text 
              color={useColorModeValue('gray.600', 'gray.400')}
              textAlign="center"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              Select the perfect skip size for your waste disposal needs
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="8xl" py={8}>
        {loading ? (
          <VStack spacing={4} py={12}>
            <Spinner size="xl" color="teal.500" thickness="4px" />
            <Text>
              Loading available skips...
            </Text>
          </VStack>
        ) : (
          <SimpleGrid 
            columns={{ base: 1, sm: 1,md:2, lg: 2, xl:3}} 
            spacing={8}
            px={{ base: 4, md: 0 }}
          >
            {skips.map((skip) => (
              <MotionBox
                key={skip.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <SkipCard
                  skip={skip}
                  isSelected={selectedId === skip.id}
                  onSelect={() =>
                    setSelectedId((prev) => (prev === skip.id ? null : skip.id))
                  }
                />
              </MotionBox>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  )
}

export default ChooseSkipSizePage