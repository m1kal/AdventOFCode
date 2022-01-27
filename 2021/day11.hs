module Main where

main = do input <- readFile "day11.txt"
          let
            l = lines input
            states = iterate step l
            allFlash = take 10 $ repeat $ take 10 $ repeat '0'
            in
            do
              print $ sum $ map flashes $ take 101 states
              print $ length $ takeWhile (allFlash /=) states

flashes board = length $ filter ('0' == ) $ concat board

step din = map (map reset) $ substep $ map (map inc) din

substep din | din == next = din
            | otherwise = substep next
            where
              next = map (\y -> map (incFromFlash din y) [0..9]) [0..9]

incFromFlash board y x = if v == 'a' then 'b' else final
                   where
                     v = val board [x,y]
                     n = length $ filter ('a' ==) $ map (val board) $ neighbors [x,y]
                     final = head $ drop n $ iterate inc v

neighbors [x,y] = [[x+1,y], [x+1,y+1],[x,y+1],[x-1,y+1],[x-1,y],[x-1,y-1],[x,y-1],[x+1,y-1]]

val board [x,y] | x <0 || y<0 || x>= length (head board) || y >= length board = '5'
                | otherwise = board !! y !! x

inc '0' = '1'
inc '1' = '2'
inc '2' = '3'
inc '3' = '4'
inc '4' = '5'
inc '5' = '6'
inc '6' = '7'
inc '7' = '8'
inc '8' = '9'
inc '9' = 'a'
inc 'a' = 'a'
inc _ = 'b'

reset 'b' = '0'
reset x = x

