import {
  Box,
  Text,
  Badge,
  Stack,
  useColorModeValue,
  Flex,
  VStack,
  Divider,
  Tooltip,
  HStack,
  Tag,
} from '@chakra-ui/react'
import { TimeIcon } from '@chakra-ui/icons'
import type { Skip } from '../types'

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: () => void
}

const SkipCard = ({ skip, isSelected, onSelect }: SkipCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const selectedColor = useColorModeValue('teal.50', 'teal.900')
  const defaultBorderColor = useColorModeValue('gray.200', 'gray.600')
  const borderColor = isSelected ? 'teal.400' : defaultBorderColor
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const mutedColor = useColorModeValue('gray.600', 'gray.400')
  const priceColor = useColorModeValue('teal.600', 'teal.300')

  // Updated: Use dynamic colors for additional costs bg and border
  const additionalCostsBorderColor = isSelected ? 'teal.400' : defaultBorderColor
  const defaultAdditionalCostsBg = useColorModeValue('gray.50', 'gray.700')
  const additionalCostsBg = isSelected ? borderColor : defaultAdditionalCostsBg

  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100)

  return (
    <Box
      p={6}
      borderWidth="2px"
      borderColor={borderColor}
      borderRadius="2xl"
      bg={isSelected ? selectedColor : cardBg}
      boxShadow={isSelected ? 'lg' : 'md'}
      cursor="pointer"
      onClick={onSelect}
      transition="all 0.2s"
      _hover={{
        boxShadow: 'xl',
        transform: 'translateY(-2px)',
      }}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold" fontSize="2xl" color={textColor}>
              {skip.size} Yard Skip
            </Text>
          </VStack>
          <Tooltip label="Dimensions and capacity details">
            <Tag size="sm" colorScheme="gray">
              {skip.postcode}
            </Tag>
          </Tooltip>
        </Flex>
        <Text fontSize="sm" color={mutedColor}>
          {skip.id}
        </Text>

        <Stack spacing={2}>
          <HStack justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <Box>
              <Text fontSize="xl" fontWeight="semibold" color={priceColor}>
                £{skip.price_before_vat.toFixed(2)}
                <Text as="span" fontSize="sm" color={textColor}>
                  {' '}
                  + VAT ({skip.vat}%)
                </Text>
              </Text>
              <Text fontSize="md" color={priceColor} fontWeight="medium" mt={1}>
                Total: £{totalPrice.toFixed(2)}
              </Text>
            </Box>

            {(skip.transport_cost || skip.per_tonne_cost) && (
              <Box
                p={3}
                borderRadius="md"
                borderColor={additionalCostsBorderColor}
                bg={additionalCostsBg}
                minWidth="10rem"
              >
                <Text fontWeight="medium" fontSize="sm" mb={1} color={isSelected? "dark" : textColor}>
                  Additional Costs
                </Text>
                <VStack spacing={1} align="start">
                  {skip.transport_cost && (
                    <HStack spacing={2}>
                      <Text fontSize="sm" color={isSelected? "dark" : mutedColor}>
                        🚚 Transport:
                      </Text>
                      <Text fontSize="sm" fontWeight="medium" color={isSelected? "dark" : textColor}>
                        £{skip.transport_cost}
                      </Text>
                    </HStack>
                  )}
                  {skip.per_tonne_cost && (
                    <HStack spacing={2}>
                      <Text fontSize="sm" color={isSelected? "dark" : mutedColor}>
                        ⚖️ Per Tonne:
                      </Text>
                      <Text fontSize="sm" fontWeight="medium" color={isSelected? "dark" : textColor}>
                        £{skip.per_tonne_cost}
                      </Text>
                    </HStack>
                  )}
                </VStack>
              </Box>
            )}
          </HStack>

          <HStack>
            <TimeIcon color={mutedColor} />
            <Text fontSize="sm" color={textColor}>
              {skip.hire_period_days} days hire included
            </Text>
          </HStack>
        </Stack>

        <Divider />

        <Stack spacing={3}>
          <HStack spacing={2} flexWrap="wrap">
            <Badge
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="full"
              colorScheme={skip.allowed_on_road ? 'green' : 'red'}
              variant="subtle"
            >
              {skip.allowed_on_road ? 'Road Placement Available' : 'No Road Placement'}
            </Badge>
            <Badge
              fontSize="xs"
              px={2}
              py={0.5}
              borderRadius="full"
              colorScheme={skip.allows_heavy_waste ? 'green' : 'red'}
              variant="subtle"
            >
              {skip.allows_heavy_waste ? 'Heavy Waste Allowed' : 'No Heavy Waste'}
            </Badge>
          </HStack>

          <HStack spacing={2}>
            {skip.area && <Tag size="sm" colorScheme="gray">{skip.area}</Tag>}
            {skip.forbidden && <Tag size="sm" colorScheme="red">Restricted Area</Tag>}
          </HStack>

          <Text fontSize="xs" color={mutedColor}>
            Last updated: {new Date(skip.updated_at).toLocaleDateString()}
          </Text>
        </Stack>
      </VStack>
    </Box>
  )
}

export default SkipCard
