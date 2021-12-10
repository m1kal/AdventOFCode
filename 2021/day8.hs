module Main where

import Data.List

main = do input <- readFile "day8.txt"
          let out = map readOut $ lines input
              i = map readIn $ lines input
              part1 = length $ filter (\x -> elem (length x) [2,3,4,7]) $ concat out  
              part2str =  map (\(a,b) -> map (decode a) b) (zip i out)
              part2 = sum $ map arrToInt part2str
              in
              do
                 print part1
                 print part2

sbl :: [String] -> [String]
sbl w = sortBy (\x y -> compare (length x) (length y)) w

readOut :: String -> [String]
readOut l = map sort $ drop 11 $ words l

readIn :: String -> [String]
readIn l = [a0,a1,a2,a3,a4,a5,a6,a7,a8,a9]
           where
           t = map sort $ sbl $ take 10 $ words l
           a1 = t !! 0
           a7 = t !! 1
           a4 = t !! 2
           a8 = t !! 9
           [a0,a6,a9] = find069t a4 a7 (take 3 (drop 6 t))
           [a2,a3,a5] = find235t a7 a6 (take 3 (drop 3 t))

find069t :: String -> String -> [String] -> [String]
find069t four seven [x,y,z] = [zero,six,nine]
                      where
                      nine = head $ filter (\n -> all (\d -> elem d n) four) [x,y,z] 
                      zero = head $ filter (\n -> all (\d -> elem d n) seven) $ filter (\n -> not ( n == nine)) [x,y,z]
                      six =  head $ filter (\t -> not (t == nine) && not (t == zero)) [x,y,z]

find235t :: String -> String -> [String] -> [String]
find235t seven six [x, y, z] = [two, three, five]
                              where
                              three = head $ filter (\c -> all (\d -> elem d c) seven) [x,y,z]
                              five = head $ filter (\c -> (all (flip elem six)) c) [x,y,z]
                              two = head $ filter (\t -> not ( t == three) && not ( t == five)) [x,y,z]

decode :: [String] -> String -> Int
decode m v = val
             where Just val = findIndex (v ==) m

arrToInt :: [Int] -> Int
arrToInt x = sum $ zipWith (*) x [1000,100,10,1]

