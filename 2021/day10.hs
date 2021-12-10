module Main where

import qualified Data.List as L

main = do input <- readFile "day10.txt"
          let l = lines input
              p2 = filter (0 <) (map (part2 []) l)
            in
            do
              print $ sum $ map (part1 []) l
              print $ (L.sort p2) !! (div (length p2) 2)

part1 stack input | input == [] = 0
                  | elem h opening = part1 (h:stack) (tail input)
                  | (head stack == match h) = part1 (tail stack) (tail input)
                  | otherwise = rank h
                  where h = head input

part2 stack input | input == [] = foldl (\acc elem -> acc * 5 + (rank elem)) 0 stack
                  | elem h opening = part2 (h:stack) (tail input)
                  | (head stack == match h) = part2 (tail stack) (tail input)
                  | otherwise = 0
                  where h = head input

opening = "([{<"
match ']' = '['
match ')' = '('
match '}' = '{'
match '>' = '<'
match _ = '_'

rank ')' = 3
rank ']' = 57
rank '}' = 1197
rank '>' = 25137
rank '(' = 1
rank '[' = 2
rank '{' = 3
rank '<' = 4
rank _ = -1000000000

