module Main where

main = do input <- readFile "day2.txt"
          putStrLn $ show $ foldl add (Position 0 0 0) $ map parseLine $ lines input

data Position = Position Int Int Int
data Command = Command Int Int

instance Show Position where
  show (Position x y h) = "(" ++ show x ++ "," ++ show y ++ "," ++ show h ++ ") => " ++
   (show $ x * h) ++ "," ++ show (x * y)

add :: Position -> Command -> Position
add (Position x y h) (Command dx dh) = Position (x+dx) (y+dx*h) (h+dh)

parseLine :: String -> Command
parseLine line = case cmd of
                   "forward" -> Command val 0
                   "down" -> Command 0 val
                   "up" -> Command 0 (- val)
                 where w = words line
                       cmd = head w
                       val = read (last w) :: Int


