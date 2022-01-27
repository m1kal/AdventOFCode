module Main where

import qualified Data.Set as S
import qualified Data.List as L

main = do input <- readFile "day13.txt"
          let
            dots = map (parseLine ',') $ take 887 $ lines input
            folds = map (parseLinex '=') $ drop 888 $ lines input
            result = foldl (\acc x -> S.toList $ S.fromList $ map (fold x) acc) dots folds 
            in
            do
              print $ S.size $ S.fromList $ map (fold (head folds)) dots
              print $ display result 0
              print $ display result 1
              print $ display result 2
              print $ display result 3
              print $ display result 4
              print $ display result 5

parseLine :: Char -> String -> [Int]
parseLine s l = [x,y]
              where
               Just sep = L.findIndex (s==) l
               x = read (take sep l) :: Int
               y = read (drop (sep+1) l) :: Int


parseLinex :: Char -> String -> [Int]
parseLinex s l = if x == 'x' then [y,0] else [0,y]
              where
               Just sep = L.findIndex (s==) l
               x = last (take sep l)
               y = read (drop (sep+1) l) :: Int


fold [fx,fy] [x,y] | fx == 0 && y > fy = [x, 2*fy - y]
                   | fy == 0 && x > fx = [2*fx -x, y]
                   | otherwise = [x,y]

display d line = map (\xv -> if elem xv xpoints then '#' else ' ') [0..maxval]
                 where
                 xpoints = map head $ filter (\elem -> last elem == line) $ d
                 maxval = maximum xpoints

