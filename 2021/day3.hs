module Main where

import Data.List
main = do input <- readFile "day3.txt"
          print $ part1 $ lines input
          print $ part2 $ lines input

part1 input = gamma*epsilon
            where ones row = length $ filter ('1'==) row
                  o = map ones $ transpose input
                  threshold = div (length input) 2
                  result = map (threshold <) o
                  gamma = boolToDec result
                  epsilon = boolToDec $ map not result

part2 input = oxygen * co2
           where  oxygen = binToDec $ filterFrom '1' 0 input
                  co2 = binToDec $ filterFrom '0' 0 input

boolToDec f = foldl (\a x -> 2*a+ (if x then 1 else 0)) 0 f
binToDec f = foldl (\a x -> 2*a+ (if x=='1' then 1 else 0)) 0 f

filterRow :: Int -> Char -> [String] -> [String]
filterRow digit value = filter (\x -> value == (x !! digit))

mcv :: [Char] -> Char
mcv input = if fromIntegral count >= threshold then '1' else '0'
                where threshold = (fromIntegral (length input) :: Float) / 2
                      count = length $ filter ('1' == ) input

filterFrom :: Char -> Int -> [String] -> String
filterFrom value digit input = if ((length result) == 1) then head result else
                                 filterFrom value (digit + 1) result
                               where mostCommon = mcv (map (\r -> r !! digit) input)
                                     expected = if (value == mostCommon) then '1' else '0'
                                     result = filterRow digit expected input

