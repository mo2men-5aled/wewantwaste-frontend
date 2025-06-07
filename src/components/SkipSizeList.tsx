import { useEffect, useState } from 'react'
import {
  Box,
  Center,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import type { Skip } from '../types'
import SkipCard from './SkipCard'

const API_URL =
  'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'

const SkipSizeList = () => {
  const [skips, setSkips] = useState<Skip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null)

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setSkips(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const selectedSkip = skips.find((s) => s.id === selectedSkipId)

  const bgPanel = useColorModeValue('whiteAlpha.900', 'gray.900')
  const borderPanel = useColorModeValue('gray.300', 'gray.700')

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="teal.500" />
      </Center>
    )
  }

  if (skips.length === 0) {
    return (
      <Center py={10}>
        <Text fontSize="lg" color="gray.500">
          No skip sizes available at this location.
        </Text>
      </Center>
    )
  }

  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 2, md: 2 }}
        px={{ base: 2, md: 0 }}
        mb={selectedSkip ? 36 : 0}
      >
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkipId === skip.id}
            onSelect={() => setSelectedSkipId(skip.id)}
          />
        ))}
      </SimpleGrid>

      {selectedSkip && (
        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg={bgPanel}
          borderTopWidth="1px"
          borderColor={borderPanel}
          boxShadow="lg"
          px={6}
          py={4}
          zIndex={1000}
        >
          <Text fontSize="md" fontWeight="bold">
            Selected Skip: {selectedSkip.size} Yard - £
            {(
              selectedSkip.price_before_vat *
              (1 + selectedSkip.vat / 100)
            ).toFixed(2)}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Hire Period: {selectedSkip.hire_period_days} days | ID: {selectedSkip.id}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export default SkipSizeList
