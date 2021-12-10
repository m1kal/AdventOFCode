module Main where

import Data.List

main = do input <- readFile "day7.txt"
          let positions = read ("[" ++ input ++ "]") :: [Int]
              posPart1 = median positions
              posPart2 = div (sum positions) (length positions) in
	    do print $ sum $ map (\x -> abs $ x-posPart1) positions
	       print $ sum $ map (\x -> abs $ x-(posPart1 - 1)) positions
	       print $ sum $ map (\x -> abs $ x-(posPart1 + 1)) positions
	       print $ sum $ map (\x -> fuel (x-posPart1)) positions
	       print $ sum $ map (\x -> fuel $ x-(posPart1 - 1)) positions
	       print $ sum $ map (\x -> fuel $ x-(posPart1 + 1)) positions

median l = sort l !! (div (length l) 2)

fuel dist | abs dist == 1 = 1
          | otherwise = (abs dist) + (fuel ((abs dist) - 1))

