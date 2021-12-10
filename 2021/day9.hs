module Main where

import qualified Data.Set as S
import qualified Data.List as L

main = do input <- readFile "day9.txt"
          let l = lines input
              part1 = sum $ map rl $ concat $ map (\y -> map (l !! y !!) $ filter (\x -> minV l [x,y]) [0..99]) [0..99]
              bottoms = concat $ map (\y -> map (:[y]) $ filter (\x -> minV l [x,y]) [0..99]) [0..99]
              in
              do
                print part1
                print $ product $ take 3 $ reverse $ L.sort $ map (\b -> length $ findMaxWell l [b]) bottoms

minV s p = all (val s p <) $ map (val s) $ neighbors p

rl ch = (read [ch] :: Int) + 1

findMaxWell :: [String] -> [[Int]] -> [[Int]]
findMaxWell s well = if well == nextWell then well else findMaxWell s nextWell
                     where
                     nextWell = expand s well

expand :: [String] -> [[Int]] -> [[Int]]
expand s well = S.toList $ S.fromList $ well ++ (concat $ map (higherNeighbors s) well)

higherNeighbors :: [String] -> [Int] -> [[Int]]
higherNeighbors s p = filter (\n -> val s p < val s n && val s n < '9') $ neighbors p

neighbors :: [Int] -> [[Int]]
neighbors [x,y] = [[x,y-1],[x+1,y],[x,y+1],[x-1,y]]

val :: [String] -> [Int] -> Char
val s [x,y] = if (y < 0 || y >= (length s) || x < 0 || x >= (length (head s))) then '9' else s !! y !! x

