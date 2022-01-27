module Main where

import qualified Data.List as L
import qualified Data.Set as S
import Debug.Trace

main = do input <- readFile "day15.txt"
          let l = lines input
              d = map (map chToI) l
              my = length d
              mx = length $ head d
              init = map (\y -> map (\x -> if x+y==0 then 0 else 10000 ) [0..(mx-1)] ) [0..(my-1)]
              d2 = expand3 d
              my2 = length d2
              mx2 = length $ head d2
              init2 = map (\y -> map (\x -> if x+y==0 then 0 else 10000 ) [0..(mx2-1)] ) [0..(my2-1)]
           in
             do
               print $ last $ last $ run2 d [mx,my] (init, [[0,0]]) 0
               print $ last $ last $ run2 d2 [mx2,my2] (init2, [[0,0]]) 0

neighbors [x,y] = [[x-1,y],[x,y+1],[x+1,y],[x,y-1]]

inBoard [mx,my] [x,y] = y >= 0 && y < mx && x >= 0 && x < mx

expand1 line = concat $ take 5 $ iterate (map inc) line 

expand2 board = map expand1 board

expand3 board = concat $ take 5 $ iterate (map (map inc)) $ expand2 board

inc x = if x == 9 then 1 else x+1
get b [x,y] = (b !! y) !! x

chToI '0' = 0
chToI '1' = 1
chToI '2' = 2
chToI '3' = 3
chToI '4' = 4
chToI '5' = 5
chToI '6' = 6
chToI '7' = 7
chToI '8' = 8
chToI '9' = 9

update2 :: [[Int]] -> [Int] -> [[Int]] -> [Int] -> (Int, [[Int]])
update2 d sizes board pos = (result, if result == cv then [] else [pos])
                     where
                     n = filter (inBoard sizes) $ neighbors pos
                     v = get d pos
                     cv = get board pos
                     vals = map (\x -> v + (get board x)) n
                     result = minimum (cv : vals)

run2 :: [[Int]] -> [Int] -> ([[Int]],[[Int]]) -> Int -> [[Int]]
run2 d size init ii = if (snd init == [])
                      then fst init
                      else
                      if (ii > 0)
                      then run2 d size next (rem (ii+1) 100)
                      else
                      trace (show (length (snd init))) $ run2 d size next (rem (ii+1) 100)
                      where next = iter2 d size init

iter2 :: [[Int]] -> [Int] -> ([[Int]],[[Int]]) -> ([[Int]],[[Int]])
iter2 d [mx,my] (board,vals) = (finalBoard, newVals)
                            where
                            vals2 = filter (inBoard [mx,my]) $ concat $ map neighbors vals
                            newVals = S.toList $ S.fromList $ concat $ map (\p -> snd $ update2 d [mx,my] board p) vals2
                            finalBoard = map (\y -> map (\x-> (update3 d [mx,my] board vals2 [x,y])) [0..(mx-1)]) [0..(my-1)]

update3 :: [[Int]] -> [Int] -> [[Int]] -> [[Int]] -> [Int] -> Int
update3 d sizes board vals pos = if (elem pos vals) then fst $ update2 d sizes board pos else get board pos

