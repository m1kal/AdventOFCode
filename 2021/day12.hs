module Main where

import qualified Data.Set as S
import qualified Data.Char as C
import qualified Data.List as L


main = do input <- readFile "day12.txt"
          let
            s = ["dc-end","HN-start","start-kj","dc-start","dc-HN","LN-dc","HN-end","kj-sa","kj-HN","kj-dc"]
            --d = map parseLine s
            d = map parseLine $ lines input
            in
            do
             print $ length $ allPaths d [["start"]]
             print $ length $ allPaths2 d [["start"]]



parseLine :: String -> [String]
parseLine l = [i,e]
              where
               Just sep = L.findIndex ('-'==) l
               i = take sep l
               e = drop (sep+1) l

allPaths d init = if next == init then init else allPaths d next
                  where
                  next = concat $ map (nextStep d) init 

allPaths2 d init = if next == init then init else allPaths2 d next
                  where
                  next = concat $ map (nextStep2 d) init 

pathsFrom :: [[String]] -> String -> [String]
pathsFrom d node = (map last $ filter ((node ==) . head) d) ++ (map head $ filter ((node ==) . last) d)

nextStep :: [[String]] -> [String] -> [[String]]
nextStep d (node:path) | node == "end" = [node:path]
                       | otherwise = map (\nn -> nn:node:path) $ filter (\nn -> (big nn) || not (elem nn path))  (pathsFrom d node)

nextStep2 d (node:path) | node == "end" = [node:path]
                        | node == "start"  && path /= [] = []
                       | otherwise = map (\nn -> nn:node:path) $ filter (\nn -> (big nn) || not (elem nn path) || not (smallCaveVisitedTwice (node:path)))  (pathsFrom d node)

big :: String -> Bool
big l = (head l) == C.toUpper (head l)

smallCaveVisitedTwice path = (length smallCaves) > S.size ( S.fromList smallCaves)
                             where
                             smallCaves = filter (\x -> not (big x)) (init path)

