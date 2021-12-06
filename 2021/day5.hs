module Main where

import qualified Data.Set as S

main = do input <- readFile "day5.txt"
          let allLines = map parseLine $ lines input
              h = filter hv allLines
              part1 = concat $ (map (intersections h) h)
              diag = filter (\x -> not (hv x)) allLines in
            do print $ length $ S.fromList $ part1
               print $ length $ S.fromList $ (part1 ++ (concat $ (map (intersections2 allLines) diag)))


parseLine x = [x1,x2,x3,x4]
              where a = words x
                    e1 = "[" ++ (head a) ++ "]"
                    e2 = "[" ++ (last a) ++ "]"
                    [x1,x2] = read e1 :: [Int]
                    [x3,x4] = read e2 :: [Int]

hv :: [Int] -> Bool
hv [x1,y1,x2,y2] = (x1 == x2) || (y1 == y2)

inLine :: [Int] -> [Int] -> Bool
inLine [x1, y1, x2, y2] [x, y] = ((x1 == x2) && (x1 == x) && (y >= min y1 y2) && (y <= max y1 y2)) ||
                                 ((y1 == y2) && (y1 == y) && (x >= min x1 x2) && (x <= max x1 x2))

inLine2 :: [Int] -> [Int] -> Bool
inLine2 [x1, y1, x2, y2] [x, y] = (inLine [x1,y1,x2,y2] [x,y]) ||
                                  ((y >= min y1 y2) && (y <= max y1 y2) && (x >= min x1 x2) && (x <= max x1 x2)) &&
                                  ((x - (x1))^2 == (y - (y1))^2)

mkLine :: [Int] -> [[Int]]
mkLine [x1,y1,x2,y2] = [[x,y] | x <- [(min x1 x2)..(max x1 x2)], y <- [(min y1 y2)..(max y1 y2)]]

mkLine2 :: [Int] -> [[Int]]
mkLine2 [x1,y1,x2,y2] = if (x1== x2) || (y1 == y2) then mkLine [x1,y1,x2,y2] else 
                       [[x1 + s*dx, y1 + s*dy] | s <- [0..lx]]
                        where lx = (max x1 x2) - (min x1 x2)
                              dx  = signum (x2-x1)
                              dy  = signum (y2-y1)

intersections :: [[Int]] -> [Int] -> [[Int]]
intersections xs s = filter (\p -> (any (\l -> (inLine l p)) ys)) points
                     where points = mkLine s
                           ys = filter (\p -> not (s == p)) xs

intersections2 :: [[Int]] -> [Int] -> [[Int]]
intersections2 xs s = filter (\p -> (any (\l -> (inLine2 l p)) ys)) points
                     where points = mkLine2 s
                           ys = filter (\p -> not (s == p)) xs

